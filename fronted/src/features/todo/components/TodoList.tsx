import { TodoItem } from "./TodoItem";
import type { Todo } from "../types/todo";

type Props = {
  todos: Todo[];
  updateTodo: (id: number, title: string, description: string) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export function TodoList(props: Props) {
  const { todos, updateTodo, completeTodo, deleteTodo } = props;
  return (
    <div className="flex flex-col gap-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}
