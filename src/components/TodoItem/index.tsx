import React, { ReactElement, useState } from "react";
import {  handlerTodoType  } from 'containers/TodoBoard/models/Todo.interface'
import styled from "styled-components";

// NOTE: Once you use rest to pass an array of methods you lose because typescript lack of features to work 
export interface TodoItemProps {
  todo: any;
  toggleModal: handlerTodoType; 
  handlerRemoveTodo: handlerTodoType; 
  handlerMarkAsDone: handlerTodoType; 
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
  toggleModal,
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
      <TodoTitle onClick={() => toggleModal(todo.id)}>{showEdit ? "Click to edit" : todo.title}</TodoTitle>

      <TodoActions>
        <button onClick={() => handlerMarkAsDone(todo.id)}>Done</button>
        <button onClick={() => handlerRemoveTodo(todo.id)}>Delete</button>
      </TodoActions>
    </Todo>
  );
}
