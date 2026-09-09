import axios from "axios";
import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/todo")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("todoの取得に失敗しました。", error);
      });
  }, []);

  const addTodo = (title: string, description: string) => {
    axios
      .post("http://localhost:3000/todo", { title, description })
      .then((response) => {
        setTodos([...todos, response.data]);
      })
      .catch((error) => {
        console.error("todoを作成できませんでした。", error);
      });
  };

  const updateTodo = (id: number, title: string, description: string) => {
    axios
      .patch(`http://localhost:3000/todo/${id}`, {
        title,
        description,
      })
      .then((response) => {
        setTodos(
          todos.map((todo) => {
            return todo.id === id ? response.data : todo;
          }),
        );
      })
      .catch((error) => {
        console.error("todoを更新できませんでした。", error);
      });
  };

  const deleteTodo = (id: number) => {
    axios
      .delete(`http://localhost:3000/todo/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("todoを削除できませんでした。", error);
      });
  };

  const completeTodo = (id: number) => {
    axios
      .patch(`http://localhost:3000/todo/${id}`, { completed: true })
      .then((response) => {
        setTodos(
          todos.map((todo) => {
            return todo.id === id ? response.data : todo;
          }),
        );
      })
      .catch((error) => {
        console.error("todoを完了にできませんでした。", error);
      });
  };
  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    completeTodo,
  };
}
