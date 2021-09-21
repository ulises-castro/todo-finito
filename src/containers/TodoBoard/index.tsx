import React, { useReducer, MouseEvent } from "react";
import styled from "styled-components";
import Button from 'components/Button'
import todoReducer, { initialTodoState } from "./todoReducer";
import { TodoBase } from './models/Todo.interface'

const TodoBody = styled.div`
  display: block;
  height: 100vh;
  width: 100vw;
`;

const TodoContainer = styled.section`
  display: flex;
  column-gap: 15px;
  height: 500px;
  width: 800px;
  justify-content: space-between;
`;

const UnDoneTodo = styled.section`
  flex-grow: 1;
  background: papayawhip;
  border: 1px solid;
  border-radius: 5px;
`;

const ButtonBlue = styled( Button )`
  padding: 1rem;
  color: blue;
  border: 2px solid blue;
  background: white;
`;

function TodoBoard() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  const renderTodos: Array<React.ReactElement> = state.todos.map((todo: any) => (
    <li key={todo.id}><button onClick={(event) => handlerRemoveTodo(todo.id, event)}>{todo.title}</button></li>
  ));

  const handlerAddTodo = (event: MouseEvent<HTMLButtonElement>) => {
    const payload: TodoBase = {
      title: "test",
      body: "hi there",
      date: new Date(),
    };

    dispatch({ type: "ADD_TODO", payload });
  };

  const handlerRemoveTodo = (todoId: number, event: MouseEvent<HTMLButtonElement>) => {
    const payload = todoId
    
    dispatch({ type: "REMOVE_TODO", payload })
  }

  return (
    <TodoBody>
      <ButtonBlue onClick={handlerAddTodo}>Add Todo</ButtonBlue>
      <TodoContainer>
        <UnDoneTodo>{renderTodos}</UnDoneTodo>
        <UnDoneTodo>{renderTodos}</UnDoneTodo>
        <UnDoneTodo>{renderTodos}</UnDoneTodo>
      </TodoContainer>
    </TodoBody>
  );
}

export default TodoBoard;
