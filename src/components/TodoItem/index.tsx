import React, { ReactElement, useState } from "react";
import styled from "styled-components";

// NOTE: Typescript does not pass methods when you use spread, so we will lose our methods
export interface TodoItemProps {
  todo: any;
  handlerRemoveTodo: (todoId: number) => void;
  handlerMarkAsDone: (todoId: number) => void;
}

const Todo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  &:hover {
    background: red;
    cursor: pointer;
  }
`;

const TodoTitle = styled.div``;
const TodoActions = styled.div``;

export default function TodoItem({
  todo,
  handlerRemoveTodo,
  handlerMarkAsDone,
}: TodoItemProps): ReactElement | null {
  const [showEdit, setShowEdit] = useState<Boolean>(false);

  return (
    <Todo
      key={todo.id}
      onMouseEnter={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
    >
      {showEdit ? (
        <TodoTitle> Click to edit </TodoTitle>
      ) : (
        <TodoTitle>{todo.title}</TodoTitle>
      )}

      <TodoActions>
        <button onClick={() => handlerMarkAsDone(todo.id)}>Done</button>
        <button onClick={() => handlerRemoveTodo(todo.id)}>Delete</button>
      </TodoActions>
    </Todo>
  );
}
