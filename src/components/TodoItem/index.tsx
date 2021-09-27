import React, { ReactElement, useState } from "react";
import { handlerTodoType } from "containers/TodoBoard/models/Todo.interface";
import styled from "styled-components";

// NOTE: Once you use rest to pass an array of methods you lose because typescript lack of features to work
export interface TodoItemProps {
  todo: any;
  handlerEditTodo?: any;
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
const Input = styled.input``;

export default function TodoItem({
  todo,
  handlerEditTodo,
  handlerRemoveTodo,
  handlerMarkAsDone,
}: TodoItemProps): ReactElement | null {
  const [showEdit, setShowEdit] = useState<Boolean>(false);
  const [value, setValue] = useState(todo.title)

  const handlerUpdateTodoTitle = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    handlerEditTodo(value)
    setShowEdit(false)
  }  

  return (
    <Todo
      key={todo.id}
      onMouseEnter={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
    >
      <TodoTitle onClick={() => false}>
        {showEdit ? (
          <form onSubmit={handlerUpdateTodoTitle}>
            <Input type="text" value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value) } />
            <button type="submit"> Ok </button>
            <button type="button" onClick={() => setValue('')}> Clear </button>
          </form>
        ) : (
          todo.title
        )}
      </TodoTitle>

      <TodoActions>
        <button onClick={() => handlerMarkAsDone(todo.id)}>Done</button>
        <button onClick={() => handlerRemoveTodo(todo.id)}>Delete</button>
      </TodoActions>
    </Todo>
  );
}
