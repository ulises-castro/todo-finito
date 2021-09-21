import React, { useReducer, MouseEvent } from "react";
import styled from "styled-components";
import { InvertedBtn } from "components/Button";
import todoReducer, { initialTodoState } from "./todoReducer";
import { TodoBase } from "./models/Todo.interface";

const TodoBody = styled.div`
  display: grid;
  justify-content: center;
  grid-template-areas:
    "action-bar" 
    "todo-container";
  height: 100vh;
  width: 100vw;
`;

const ActionBar = styled.header`
  grid-area: action-bar;
  display: flex;
  align-items: center;
  justify-content: end;
`

const TodoContainer = styled.section`
  grid-area: todo-container;
  display: flex;
  column-gap: 15px;
  height: 500px;
  width: 800px;
  justify-content: space-between;
`;

const UnDoneTodo = styled.section`
  flex-grow: 1;
  background: #e8ddb5;
  border: 1px solid;
  border-radius: 5px;
`;

const SimpleBtn = styled(InvertedBtn)``;

function TodoBoard() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  const renderTodos: Array<React.ReactElement> = state.todos.map(
    (todo: any) => (
      <li key={todo.id}>
        <button onClick={(event) => handlerRemoveTodo(todo.id, event)}>
          {todo.title}
        </button>
      </li>
    )
  );

  const handlerAddTodo = (event: MouseEvent<HTMLButtonElement>) => {
    const payload: TodoBase = {
      title: "test",
      body: "hi there",
      date: new Date(),
    };

    dispatch({ type: "ADD_TODO", payload });
  };

  const handlerRemoveTodo = (
    todoId: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    const payload = todoId;

    dispatch({ type: "REMOVE_TODO", payload });
  };

  return (
    <TodoBody>
      <ActionBar>
        <div><SimpleBtn onClick={handlerAddTodo}>Add Todo</SimpleBtn></div>
      </ActionBar>
      <TodoContainer>
        <UnDoneTodo>{renderTodos}</UnDoneTodo>
        <UnDoneTodo>{renderTodos}</UnDoneTodo>
        <UnDoneTodo>{renderTodos}</UnDoneTodo>
      </TodoContainer>
    </TodoBody>
  );
}

export default TodoBoard;
