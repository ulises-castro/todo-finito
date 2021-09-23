import React, { ReactElement } from "react";

export interface TodoItemProps {
  todo: any;
}

export default function TodoItem({ todo }: TodoItemProps): ReactElement | null {
  return (
    <>
      <div key={todo.id}>
        <button onClick={(event) => console.log(todo.id, event)}>
          {todo.title}
        </button>
      </div>
    </>
  );
}
