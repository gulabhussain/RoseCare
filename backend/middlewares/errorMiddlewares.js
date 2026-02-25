class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 400;
    err.message = err.message || "Internal Server Error";

    // MongoDB duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        err = new ErrorHandler("JSON Web Token is invalid, Try Again!", 400);
    }

    if (err.name === "TokenExpiredError") {
        err = new ErrorHandler("JSON Web Token is expired, Try Again!", 400);
    }

    // Cast error
    if (err.name === "CastError") {
        err = new ErrorHandler(
            `Resource not found. Invalid: ${err.path}`,
            400
        );
    }

    // ✅ MONGOOSE VALIDATION ERROR FIX (MAIN PART)
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map(error => error.message)
            .join(" ");
        err = new ErrorHandler(message, 400);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;
