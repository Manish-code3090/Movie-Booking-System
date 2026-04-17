import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const [scheme, header_token]= req.headers.authorization ? req.headers.authorization.split(" ") : [null, null];
    const cookie_token = req.cookies.token;

    const token = scheme === "Bearer" && header_token ? header_token : cookie_token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = { id: decoded.id, email: decoded.email, username: decoded.username };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}