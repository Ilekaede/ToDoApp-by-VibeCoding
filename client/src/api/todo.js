import axios from "axios";

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
export const getTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};

// 特定のTodoの取得
export const getTodo = async (id) => {
  const response = await api.get(`/todos/${id}`);
  return response.data;
};

// Todoの作成
export const createTodo = async (input) => {
  const response = await api.post("/todos", input);
  return response.data;
};

// Todoの更新
export const updateTodo = async (id, input) => {
  const response = await api.put(`/todos/${id}`, input);
  return response.data;
};

// Todoの削除
export const deleteTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
