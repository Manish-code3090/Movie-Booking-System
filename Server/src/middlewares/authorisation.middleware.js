import apiError from "../util/error.util";
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new apiError("You are not authorized to access this route", 403));
        }

        next();
    };
};

export default authorize;