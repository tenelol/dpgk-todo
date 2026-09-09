import { useState } from "react";

type Props = {
  addTodo: (title: string, description: string) => void;
};

export function TodoForm({ addTodo }: Props) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const onClickAdd = () => {
    addTodo(title, description);
    (setTitle(""), setDescription(""));
  };
  
  return (
    <div className="flex flex-col gap-2 items-center pt-60">
      <input
        className="input glass"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <input
        className="textarea glass"
        type="textarea"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <div className="aura aura-gold">
        <button
          className="btn w-64 rounded-full"
          onClick={onClickAdd}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
