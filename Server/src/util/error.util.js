 export default class apiError extends Error {
    constructor(
        message = "An error occurred",
        status = 500,
        errors = [],
        stack = ""
    ){ 
        super(message);
        this.status = status;
        this.message = message;
        this.data = null;
        this.errors = errors;
        this.success = false;
          if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}