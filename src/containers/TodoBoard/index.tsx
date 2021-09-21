import React, { useReducer } from "react";
import styled from "styled-components";
import todoReducer, { initialTodoState } from "./todoReducer";
import { TodoBase } from './models/Todo.interface'

const TodoBody = styled.div`
  display: block;
  height: 100vh;
  width: 100vw;
`;

const TodoSection = styled.section`
  display: flex;
  height: 400px;
  width: 200px;
  justify-content: space-between;
`;

const UnDoneTodo = styled.section`
  background: papayawhip;
  border: 1px solid;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 1rem;
  color: blue;
  border: 2px solid blue;
  background: white;
`;

function TodoBoard() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  const renderTodos: Array<React.ReactElement> = state.todos.map((todo: any) => (
    <li>{todo.title}</li>
  ));

  const handlerAddTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const payload: TodoBase = {
      title: "test",
      body: "hi there",
      date: new Date(),
      status: "undone",
    };

    dispatch({ type: "ADD_TODO", payload });
  };

  return (
    <TodoBody>
      <Button onClick={handlerAddTodo}>Add Todo</Button>
      <TodoSection>{renderTodos}</TodoSection>
    </TodoBody>
  );
}

export default TodoBoard;
