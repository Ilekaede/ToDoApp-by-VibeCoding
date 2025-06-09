import { ValidationError } from "./error";

export interface TodoInput {
  title: string;
  description?: string;
  completed?: boolean;
}

export const validateTodoInput = (input: TodoInput) => {
  if (!input.title || input.title.trim().length === 0) {
    throw new ValidationError("Title is required");
  }

  if (input.title.length > 100) {
    throw new ValidationError("Title must be less than 100 characters");
  }

  if (input.description && input.description.length > 500) {
    throw new ValidationError("Description must be less than 500 characters");
  }

  return {
    title: input.title.trim(),
    description: input.description?.trim(),
    completed: input.completed ?? false,
  };
};
