import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
import refreshTokenModel from "../models/refreshToken.js";
import { creatJti, encryptToken, rotateRefreshToken, signAccessToken, signRefreshToken, createRefreshToken, setRefreshCookie } from "../util/auth.js";

// register function 
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username && email && password) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User allredy exist" });
      }
      const hash = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        hash_password: hash,
      });
      const user = await newUser.save();
      if (!user) {
        return res.status(500).json({ message: "Unable to save user" });
      }
      console.log("User successfully created", user);
      return res.status(201).json({
        message: "User created",
        user : {username, email},
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// login function 
export const login = async (req, res) => {
 try {
   const {username, email, password} = req.body;
   // finding user with email and username
  const user = await User.findOne({ email , username })
  if(!user){
    return res.status(404).json({ message : "wrong credintial"});
  } 
    const match = await bcrypt.compare(password, user.hash_password)

    // if crediential is correct then create access token and refresh token
    if(username == user.username && match){
 const ascessToken = signAccessToken(user);
const jti = creatJti();
const refreshToken = signRefreshToken(user, jti);
await createRefreshToken(user._id, jti, req.ip, refreshToken, req.headers['user-agent'] || ' ');
setRefreshCookie(res, refreshToken);
//console.log("Login successfull",ascessToken); // testing purpose
return res.status(200).json({ message : "Login successfull", ascessToken }); 
    }
    // if credintial is wrong then send error message
    return res.status(404).json({ message : "wrong credintial"});
 } catch (error) {
  console.log(error);
   return res.status(500).json({ message: 'Server error' });
  
 }
}
  

export const refreshAscessToken = async (req, res) => {
  try{
const { refreshToken } = req.cookies;
if(!refreshToken) return res.status(401).json({ message: 'Unauthorized' });
const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
const tokenHash = encryptToken(refreshToken);
const existingToken = await refreshTokenModel.findOne({ tokenHash,jti: decoded.jti }).populate('user');
if(!existingToken || existingToken.revokedAt || existingToken.expiresAt < new Date()){
  return res.status(401).json({ message: 'Unauthorized as existiong token have issue' });
}
const newAscessToken = await rotateRefreshToken(existingToken, existingToken.user, req,res);
return res.status(200).json({ ascessToken : newAscessToken });
  }catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

