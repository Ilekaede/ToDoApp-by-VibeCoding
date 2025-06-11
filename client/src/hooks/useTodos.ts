import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todo";
import { CreateTodoInput, UpdateTodoInput } from "../types/todo";

// クエリキー
const TODO_KEYS = {
  all: ["todos"] as const,
  lists: () => [...TODO_KEYS.all, "list"] as const,
  detail: (id: number) => [...TODO_KEYS.all, "detail", id] as const,
};

// Todo一覧の取得
export const useTodos = () => {
  return useQuery({
    queryKey: TODO_KEYS.lists(),
    queryFn: getTodos,
  });
};

// 特定のTodoの取得
export const useTodo = (id: number) => {
  return useQuery({
    queryKey: TODO_KEYS.detail(id),
    queryFn: () => getTodo(id),
    enabled: !!id, // idが存在する場合のみクエリを実行
  });
};

// Todoの作成
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTodoInput) => createTodo(input),
    onSuccess: () => {
      // 作成成功時にTodo一覧を再取得
      queryClient.invalidateQueries({ queryKey: TODO_KEYS.lists() });
    },
  });
};

// Todoの更新
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateTodoInput }) =>
      updateTodo(id, input),
    onSuccess: (data) => {
      // 更新成功時に該当のTodoと一覧を再取得
      queryClient.invalidateQueries({ queryKey: TODO_KEYS.lists() });
      if (data.data) {
        queryClient.invalidateQueries({
          queryKey: TODO_KEYS.detail(data.data.id),
        });
      }
    },
  });
};

// Todoの削除
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      // 削除成功時にTodo一覧を再取得
      queryClient.invalidateQueries({ queryKey: TODO_KEYS.lists() });
    },
  });
};
