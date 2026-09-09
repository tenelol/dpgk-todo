import { useState } from "react";
import type { Todo } from "../types/todo";

type Props = {
  todo: Todo;
  updateTodo: (id: number, title: string, description: string) => void;
  onClickClose: () => void;
};

export function TodoEditForm(props: Props) {
  const { todo, updateTodo, onClickClose } = props;
  const [editTitle, setEditTile] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");

  const onClickUpdate = (id: number) => {
    updateTodo(id, editTitle, editDescription);
    onClickClose();
    setEditTile("");
    setEditDescription("");
  };

  return (
    <div className="card card-dash glass w-96">
      <div className="card-body">
        <input
          className="input card-title input-ghost"
          placeholder="edit title"
          value={editTitle}
          onChange={(e) => setEditTile(e.currentTarget.value)}
        />
        <input
          className="input input-ghost"
          placeholder="edit description"
          value={editDescription}
          onChange={(e) => setEditDescription(e.currentTarget.value)}
        />
        <div className="card-actions justify-end">
        <button className="btn" onClick={onClickClose}>
          close
        </button>
        <button className="btn" onClick={() => onClickUpdate(todo.id)}>
          update
        </button>
        </div>
      </div>
    </div>
  );
}
