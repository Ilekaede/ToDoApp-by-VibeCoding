"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTodoInput = void 0;
const error_1 = require("./error");
const validateTodoInput = (input) => {
    var _a, _b;
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
        description: (_a = input.description) === null || _a === void 0 ? void 0 : _a.trim(),
        completed: (_b = input.completed) !== null && _b !== void 0 ? _b : false,
    };
};
exports.validateTodoInput = validateTodoInput;
