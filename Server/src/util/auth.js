import crypto from 'crypto';
import refreshTokenModel from '../models/refreshToken.js';
import jwt from 'jsonwebtoken';
import { log } from 'console';

export const encryptToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
}

export const creatJti = () =>{
    return crypto.randomBytes(16).toString('hex')
}

export const signRefreshToken = (user, jti) => {
const payload = {
    id : user._id,
    email : user.email,
    jti
}
return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "7d"});

}
export const signAccessToken = (user) => {
  const payload = {
    id : user._id,
    email : user.email,
    role : user.role,
  }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "15m"});
}

export const setRefreshCookie = (res, payload) => {
  res.cookie('refreshToken', payload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export const createRefreshToken = async (id,jti, ip,refreshToken, userAgent) => {
  const tokenHash = encryptToken(refreshToken);  
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
  await refreshTokenModel.create({
    user: id,
    tokenHash,
    jti,
    expiresAt,
    ip,
    userAgent
  });

}

export const rotateRefreshToken = async (existingToken, user, req,res) => {
  // old token revoke
 existingToken.revokedAt = new Date();
  const newJti = creatJti();
  existingToken.replacedBy = newJti;
  await existingToken.save();

  // new token issue
  const newRefreshToken = signRefreshToken(user, newJti);
  //console.log("new refresh token", newRefreshToken);
  const newascessToken = signAccessToken(user);
  await createRefreshToken( user._id, newJti, req.ip, newRefreshToken,req.headers['user-agent'] || ' ');
  setRefreshCookie(res, newRefreshToken);
  return newascessToken;
}
