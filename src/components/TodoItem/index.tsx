import React, { ReactElement, MouseEventHandler } from "react";

export interface TodoItemProps {
  todo: any;
  handleRemoveTodo: (todo:number) => void;
}

export default function TodoItem({ todo, handleRemoveTodo }: TodoItemProps): ReactElement | null {

  return (
    <>
      <div key={todo.id}>
        <button onClick={() => handleRemoveTodo(todo.id)}>
          {todo.title}
        </button>
      </div>
    </>
  );
}
