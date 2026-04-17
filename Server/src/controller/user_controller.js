import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

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
  const user = await User.findOne({ email , username })
  if(!user) res.status(404).json({ message : "wrong credintial"});
    const match = await bcrypt.compare(password, user.hash_password)
    if(username == user.username && match){
const payload = {
  id : user._id,
  username : user.username,
  email : user.email
}
const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "1d"})
res.cookie("token", token, {
  httpOnly : true,
  secure : process.env.NODE_ENV === "production",
  sameSite : "strict",
  maxAge : 24 * 60 * 60 * 1000
})
res.status(200).json({ message : "Login successfull", user : payload, token }); 
    }
    res.status(404).json({ message : "wrong credintial"});
 } catch (error) {
  console.log(error);
  
 }
}


