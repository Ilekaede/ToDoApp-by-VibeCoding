import { ValidationError } from "./error";

export interface TodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const validateTodoInput = (input: TodoInput, isUpdate = false) => {
  if (!isUpdate && (!input.title || input.title.trim().length === 0)) {
    throw new ValidationError("Title is required");
  }

  if (input.title !== undefined) {
    if (input.title.trim().length === 0) {
      throw new ValidationError("Title cannot be empty");
    }

    if (input.title.length > 100) {
      throw new ValidationError("Title must be less than 100 characters");
    }
  }

  if (input.description && input.description.length > 500) {
    throw new ValidationError("Description must be less than 500 characters");
  }

  const result: any = {};
  if (input.title !== undefined) result.title = input.title.trim();
  if (input.description !== undefined)
    result.description = input.description.trim();
  if (input.completed !== undefined) result.completed = input.completed;

  return result;
};
