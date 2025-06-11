"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.DatabaseError = exports.NotFoundError = exports.ValidationError = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message) {
        super(400, message);
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends AppError {
    constructor(message) {
        super(404, message);
    }
}
exports.NotFoundError = NotFoundError;
class DatabaseError extends AppError {
    constructor(message) {
        super(500, message);
    }
}
exports.DatabaseError = DatabaseError;
const handleError = (error) => {
    if (error instanceof AppError) {
        return {
            success: false,
            error: {
                message: error.message,
                statusCode: error.statusCode,
            },
        };
    }
    // 予期せぬエラーの場合
    console.error("Unexpected error:", error);
    return {
        success: false,
        error: {
            message: "Internal server error",
            statusCode: 500,
        },
    };
};
exports.handleError = handleError;
