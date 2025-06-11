import React, { useState } from "react";
import { useCreateTodo, useUpdateTodo } from "../hooks/useTodos";
import { Todo } from "../types/todo";

interface TodoFormProps {
  todo?: Todo;
  onSuccess?: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ todo, onSuccess }) => {
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");

  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    try {
      if (todo) {
        // 更新
        await updateTodo.mutateAsync({
          id: todo.id,
          input: { title, description },
        });
      } else {
        // 新規作成
        await createTodo.mutateAsync({ title, description });
      }

      // フォームをリセット
      setTitle("");
      setDescription("");
      onSuccess?.();
    } catch (error) {
      console.error("Error saving todo:", error);
      alert("保存に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          タイトル
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="タイトルを入力"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          説明
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="説明を入力（任意）"
        />
      </div>

      <button
        type="submit"
        disabled={createTodo.isPending || updateTodo.isPending}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {createTodo.isPending || updateTodo.isPending
          ? "保存中..."
          : todo
          ? "更新"
          : "作成"}
      </button>
    </form>
  );
};
