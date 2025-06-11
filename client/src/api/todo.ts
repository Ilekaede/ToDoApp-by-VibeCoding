import axios from "axios";
import {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
  TodoListResponse,
  TodoResponse,
} from "../types/todo";

// APIのベースURL
const API_BASE_URL = "http://localhost:3000";

// Axiosインスタンスの作成
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Todo一覧の取得
export const getTodos = async (): Promise<TodoListResponse> => {
  const response = await api.get<TodoListResponse>("/todos");
  return response.data;
};

// 特定のTodoの取得
export const getTodo = async (id: number): Promise<TodoResponse> => {
  const response = await api.get<TodoResponse>(`/todos/${id}`);
  return response.data;
};

// Todoの作成
export const createTodo = async (
  input: CreateTodoInput
): Promise<TodoResponse> => {
  const response = await api.post<TodoResponse>("/todos", input);
  return response.data;
};

// Todoの更新
export const updateTodo = async (
  id: number,
  input: UpdateTodoInput
): Promise<TodoResponse> => {
  const response = await api.put<TodoResponse>(`/todos/${id}`, input);
  return response.data;
};

// Todoの削除
export const deleteTodo = async (id: number): Promise<TodoResponse> => {
  const response = await api.delete<TodoResponse>(`/todos/${id}`);
  return response.data;
};
