import React, { useState } from "react";
import { Todo } from "../types/todo";
import { useUpdateTodo, useDeleteTodo } from "../hooks/useTodos";
import { TodoForm } from "./TodoForm";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleToggleComplete = async () => {
    try {
      await updateTodo.mutateAsync({
        id: todo.id,
        input: { completed: !todo.completed },
      });
    } catch (error) {
      console.error("Error toggling todo:", error);
      alert("更新に失敗しました");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("このTodoを削除してもよろしいですか？")) {
      return;
    }

    try {
      await deleteTodo.mutateAsync(todo.id);
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("削除に失敗しました");
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <TodoForm todo={todo} onSuccess={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div>
            <h3
              className={`text-lg font-medium ${
                todo.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p className="mt-1 text-sm text-gray-500">{todo.description}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-indigo-600 hover:text-indigo-900"
          >
            編集
          </button>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 hover:text-red-900"
          >
            削除
          </button>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        作成日時: {new Date(todo.createdAt).toLocaleString()}
      </div>
    </div>
  );
};
