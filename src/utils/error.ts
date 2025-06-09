export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(500, message);
  }
}

export const handleError = (error: unknown) => {
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
