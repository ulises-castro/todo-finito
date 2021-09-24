import React, { ReactElement } from "react";
import styled from "styled-components";

// FIX: Typescript does not pass methods when you use spread, so we will lose our methods
export interface TodoItemProps {
  todo: any;
  handlerRemoveTodo: (todoId: number) => void;
  handlerMarkAsDone: (todoId: number) => void;
}

const Todo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const TodoTitle = styled.div``;
const TodoActions = styled.div``;

export default function TodoItem({
  todo,
  handlerRemoveTodo,
  handlerMarkAsDone,
}: TodoItemProps): ReactElement | null {
  return (
    <Todo key={todo.id}>
      <TodoTitle>{todo.title}</TodoTitle>
      <TodoActions>
        <button onClick={() => handlerMarkAsDone(todo.id)}>Done</button>
        <button onClick={() => handlerRemoveTodo(todo.id)}>Delete</button>
      </TodoActions>
    </Todo>
  );
}
