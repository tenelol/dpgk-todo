import { useState } from "react";
import type { Todo } from "../types/todo";
import { TodoEditForm } from "./TodoEditForm";

type Props = {
  todo: Todo;
  updateTodo: (id: number, editTitle: string, editDescription: string) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export function TodoItem(props: Props) {
  const { todo, updateTodo, completeTodo, deleteTodo } = props;
  const [isEditing, setIsEditing] = useState(false);
  const onClickComplete = (id: number) => {
    completeTodo(id);
  };
  const onClickDelete = (id: number) => {
    deleteTodo(id);
  };
  const onClickOpen = () => {
    setIsEditing(true);
  };
  const onClickClose = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <TodoEditForm todo={todo} updateTodo={updateTodo} onClickClose={onClickClose} />
      ) : (
        <div className="card card-dash glass w-96" key={todo.id}>
          <div className="card-body">
            <h3 className="card-title">{todo.title}</h3>
            <p>{todo.description}</p>
            {todo.completed !== true ? (
              <div className="card-actions justify-end">
                <button className="btn" onClick={() => onClickOpen()}>
                  edit
                </button>
                <button className="btn" onClick={() => onClickDelete(todo.id)}>
                  delete
                </button>
                <button
                  className="btn"
                  onClick={() => onClickComplete(todo.id)}
                >
                  Done!
                </button>
              </div>
            ) : (
              <div className="card-actions justify-end">
                <button className="btn" onClick={() => onClickOpen()}>
                  edit
                </button>
                <button className="btn" onClick={() => onClickDelete(todo.id)}>
                  delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
