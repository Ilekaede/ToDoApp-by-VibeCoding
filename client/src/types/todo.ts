// Todoの基本型
export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Todo作成時の入力型
export interface CreateTodoInput {
  title: string;
  description?: string;
}

// Todo更新時の入力型
export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

// APIレスポンスの型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    statusCode: number;
  };
}

// Todoリストのレスポンス型
export type TodoListResponse = ApiResponse<Todo[]>;

// 単一Todoのレスポンス型
export type TodoResponse = ApiResponse<Todo>;
