import React from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";

export const TodoList = () => {
  const { data, isLoading, error } = useTodos();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">エラーが発生しました</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Todoリスト</h1>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">新規作成</h2>
        <TodoForm />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Todo一覧</h2>
        {data?.data && data.data.length > 0 ? (
          data.data.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <div className="text-center text-gray-500 py-8">Todoがありません</div>
        )}
      </div>
    </div>
  );
};
