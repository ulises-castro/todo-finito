import React, { useReducer, MouseEvent, useState } from "react";
import styled from "styled-components";
import TodoContainer from "components/TodoContainer";
import TodoItem from "components/TodoItem";

import { InvertedBtn } from "components/Button";
import todoReducer, { initialTodoState } from "./todoReducer";
import { TodoProps, handlerTodoType } from "./models/Todo.interface";

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
`;

interface ITodoStatusContainer {
  direction?: string;
}

const TodoStatusContainer = styled.section<ITodoStatusContainer>`
  grid-area: todo-container;
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
  height: 500px;
  width: 800px;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: space-between;
`;

const SimpleBtn = styled(InvertedBtn)``;

function TodoBoard() {
  const [listMode, setListMode] = useState<Boolean>(true);
  const [showModal, setShowModal] = useState<String>('')
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  const handlerAddTodo = () => {
    const payload: TodoProps = {
      title: "test",
      body: "hi there",
      date: new Date(),
    };

    dispatch({ type: "ADD_TODO", payload });
  };

  const toggleModal: handlerTodoType = (todoId) => {

  }

  const handlerRemoveTodo: handlerTodoType = (todoId) => { 
    dispatch({ type: "REMOVE_TODO", payload: todoId });
  };

  const handlerMarkAsDone: handlerTodoType = (todoId) => {
    dispatch({ type: "MARK_COMPLETED", payload: todoId });
  }

  const filterTodosBy: any = (status = "done") =>
    state.todos
      .filter((todo: any) => todo.status === status)
      .map((todo: any) => (
        <TodoItem
          handlerMarkAsDone={handlerMarkAsDone}
          handlerRemoveTodo={handlerRemoveTodo}
          toggleModal={toggleModal}
          key={todo.id}
          todo={todo}
        />
      ));

  return (
    <TodoBody>
      <ActionBar>
        <div>
          <SimpleBtn onClick={handlerAddTodo}>Add Todo</SimpleBtn>
        </div>
        <div>
          <SimpleBtn onClick={() => setListMode(!listMode)}>
            Mode: {listMode ? "List" : "Board"}
          </SimpleBtn>
        </div>
      </ActionBar>
      <TodoStatusContainer direction={listMode ? "column" : "row"}>
        <h2>Undone</h2>
        <TodoContainer>{filterTodosBy("undone")} </TodoContainer>
        <h1>In progress </h1>
        <TodoContainer>{filterTodosBy("doing")} </TodoContainer>
        <h1>Done</h1>
        <TodoContainer>{filterTodosBy()} </TodoContainer>
      </TodoStatusContainer>
    </TodoBody>
  );
}

export default TodoBoard;
