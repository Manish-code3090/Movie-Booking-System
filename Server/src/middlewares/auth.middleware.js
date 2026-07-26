import jwt from "jsonwebtoken";
import apiError from "../util/error.util.js";

export const verifyToken = (req, res, next) => {
    const [scheme, header_token]= req.headers.authorization ? req.headers.authorization.split(" ") : [null, null];
    const cookie_token = req.cookies.token;

    const token = scheme === "Bearer" && header_token ? header_token : cookie_token;
    if (!token) {
        throw new apiError("Unauthorized", 401);
    }   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = decoded;
        next();
    } catch (error) {
        throw new apiError("Invalid token", 401);
    }
}