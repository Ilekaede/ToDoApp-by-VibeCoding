"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTodoInput = void 0;
const error_1 = require("./error");
const validateTodoInput = (input) => {
    if (!input.title || input.title.trim().length === 0) {
        throw new error_1.ValidationError("Title is required");
    }
    if (input.title.length > 100) {
        throw new error_1.ValidationError("Title must be less than 100 characters");
    }
    if (input.description && input.description.length > 500) {
        throw new error_1.ValidationError("Description must be less than 500 characters");
    }
    return {
        title: input.title.trim(),
        description: input.description?.trim(),
        completed: input.completed ?? false,
    };
};
exports.validateTodoInput = validateTodoInput;
