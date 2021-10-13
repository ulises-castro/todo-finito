import React, { useReducer, useState } from "react";
import TodoContainer from "components/TodoContainer";
import TodoItem from "components/TodoItem";
import { TodoStatusContainer, TodoBody, ActionBar } from "./styled";
import { Form, Input } from "css-components";
import { Header, SimpleBtn } from "css-components";
import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_COMPLETED_STATUS,
  UPDATE_TODO,
} from "./models/Todo.interface";

import todoReducer, { initialTodoState } from "./todoReducer";
import { TodoProps, handlerTodoType, TodoBase } from "./models/Todo.interface";

function TodoBoard() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [newTodoValue, setNewTodoValue] = React.useState<string>('')
  const inputNewTodoRef = React.useRef<HTMLInputElement | null>(null)

  const handleAddTodo = (event: any) => {
    event.preventDefault()

    const payload: TodoProps = {
      title: newTodoValue,
      date: new Date(),
    };

    dispatch({ type: ADD_TODO, payload });

    setNewTodoValue('')

    if (inputNewTodoRef.current) inputNewTodoRef.current.focus()
  };

  const handlerRemoveTodo: handlerTodoType = (todoId) => {
    dispatch({ type: REMOVE_TODO, payload: todoId });
  };

  const handleToggleCompleted: handlerTodoType = (todoId) => {
    dispatch({ type: TOGGLE_COMPLETED_STATUS, payload: todoId });
  };

  const handlerEditTodo = (todoId: string, data: TodoBase): void => {
    dispatch({ type: UPDATE_TODO, payload: { todoId, data } });
  };

  const handleChangeNewTodoValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoValue(event.target.value)
  }

  // TODO: This could be refactored
  const filterTodosBy: any = (status = "") =>
    state.todos
      .filter((todo: any) => (status ? todo.status === status : true))
      .map((todo: any) => (
        <TodoItem
          // TODO: Create its own type for this because it is used more than once
          handlerEditTodo={(data: TodoBase) => handlerEditTodo(todo.id, data)}
          handleToggleCompleted={handleToggleCompleted}
          handlerRemoveTodo={handlerRemoveTodo}
          key={todo.id}
          todo={todo}
        />
      ));

  return (
    <TodoBody>
      <Header>
        <h1> TodoFinito </h1>
      </Header>
      <ActionBar>
        <Form onSubmit={handleAddTodo} justifyContent="center">
          <div>
            <Input type="text" ref={inputNewTodoRef} value={newTodoValue} onChange={handleChangeNewTodoValue} placeholder="Write a new todo..." />
            <SimpleBtn type="submit" disabled={!newTodoValue}>Add Todo</SimpleBtn>
          </div>
        </Form>
      </ActionBar>
      <TodoStatusContainer>
        <TodoContainer title="Tasks">{filterTodosBy()}</TodoContainer>
      </TodoStatusContainer>
    </TodoBody>
  );
}

export default TodoBoard;
