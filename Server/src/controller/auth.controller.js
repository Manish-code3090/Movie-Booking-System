import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
import refreshTokenModel from "../models/refreshToken.js";
import {
  creatJti,
  encryptToken,
  rotateRefreshToken,
  signAccessToken,
  signRefreshToken,
  createRefreshToken,
  setRefreshCookie,
} from "../util/auth.js";
import asyncHandler from "../util/asyncHandler.util.js";
import apiError from "../util/error.util.js";

// register function
export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new apiError("User already exists", 400);
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      hash_password: hash,
    });
    const user = await newUser.save();
    if (!user) {
      throw new apiError("Unable to save user", 500);
    }
    console.log("User successfully created", user);
    return res.status(201).json({
      message: "User created",
      user: { username, email },
    });
  }
});

// login function
export const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // finding user with email and username
  const user = await User.findOne({ email, username });
  if (!user) {
    throw new apiError("Wrong credentials", 404);
  }
  const match = await bcrypt.compare(password, user.hash_password);

  // if crediential is correct then create access token and refresh token
  if (username == user.username && match) {
    const ascessToken = signAccessToken(user);
    const jti = creatJti();
    const refreshToken = signRefreshToken(user, jti);
    await createRefreshToken(
      user._id,
      jti,
      req.ip,
      refreshToken,
      req.headers["user-agent"] || " ",
    );
    setRefreshCookie(res, refreshToken);
    //console.log("Login successfull",ascessToken); // testing purpose
    return res.status(200).json({ message: "Login successfull", ascessToken });
  }
  // if credintial is wrong then send error message
  throw new apiError("Wrong credentials", 404);
});

export const refreshAscessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new apiError("Unauthorized", 404);
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  const tokenHash = encryptToken(refreshToken);
  const existingToken = await refreshTokenModel
    .findOne({ tokenHash, jti: decoded.jti })
    .populate("user");
  if (
    !existingToken ||
    existingToken.revokedAt ||
    existingToken.expiresAt < new Date()
  ) {
    throw new apiError("Unauthorized", 401);
  }
  const newAscessToken = await rotateRefreshToken(
    existingToken,
    existingToken.user,
    req,
    res,
  );
  return res.status(200).json({ ascessToken: newAscessToken });
});

export const Logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.refresh_token;
  if (token) {
    const tokenHash = hashToken(token);
    const doc = await RefreshToken.findOne({ tokenHash });
    if (doc && !doc.revokedAt) {
      doc.revokedAt = new Date();
      await doc.save();
    }
  }
  res.clearCookie("refresh_token", { path: "/api/auth/refresh" });
  res.json({ message: "Logged out" });
});
