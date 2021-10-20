import React, { useReducer } from "react";
import TodoContainer from "components/TodoContainer";
import TodoItem from "components/TodoItem";
import {
  TodoStatusContainer,
  TodoBody,
  ActionBar,
  SquareBtn,
  SquareInput,
} from "./styled";
import { SForm } from "css-components";
import { SHeader, Flex } from "css-components";
import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_COMPLETED_STATUS,
  UPDATE_TODO,
} from "./models/Todo.interface";

import todoReducer, { initialTodoState } from "./todoReducer";
import {
  TodoProps,
  handlerTodoType,
  TodoBase,
  handleEditTodoType,
} from "./models/Todo.interface";

function TodoBoard() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [newTodoValue, setNewTodoValue] = React.useState<string>("");
  const inputNewTodoRef = React.useRef<HTMLInputElement | null>(null);

  const handleAddTodo = (event: any) => {
    event.preventDefault();

    const payload: TodoProps = {
      title: newTodoValue,
      date: new Date(),
    };

    dispatch({ type: ADD_TODO, payload });

    setNewTodoValue("");

    if (inputNewTodoRef.current) inputNewTodoRef.current.focus();
  };

  const handlerRemoveTodo: handlerTodoType = (todoId) => {
    dispatch({ type: REMOVE_TODO, payload: todoId });
  };

  const handleToggleCompleted: handlerTodoType = (todoId) => {
    dispatch({ type: TOGGLE_COMPLETED_STATUS, payload: todoId });
  };

  const handlerEditTodo: handleEditTodoType = (todoId, data) => {
    dispatch({ type: UPDATE_TODO, payload: { todoId, data } });
  };

  const handleChangeNewTodoValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTodoValue(event.target.value);
  };

  const filterTodosBy: any = (status = "") => {
    const filteredTodos = state.todos.filter((todo: any) =>
      status ? todo.status === status : true
    );

    return filteredTodos.map((todo: any) => (
      <TodoItem
        handleEditTodo={(data: TodoBase) => handlerEditTodo(todo.id, data)}
        handleToggleCompleted={handleToggleCompleted}
        handlerRemoveTodo={handlerRemoveTodo}
        key={todo.id}
        todo={todo}
      />
    ));
  };

  return (
    <TodoBody>
      <SHeader>
        <h1> TodoFinito </h1>
      </SHeader>
      <ActionBar>
        <SForm onSubmit={handleAddTodo} justifyContent="center">
          <Flex justifyContent="strech">
            <SquareInput
              type="text"
              ref={inputNewTodoRef}
              value={newTodoValue}
              onChange={handleChangeNewTodoValue}
              placeholder="Write a new todo..."
            />
            <SquareBtn type="submit" disabled={!newTodoValue}>
              Add
            </SquareBtn>
          </Flex>
        </SForm>
      </ActionBar>
      <TodoStatusContainer>
        <TodoContainer title="Tasks">{filterTodosBy()}</TodoContainer>
      </TodoStatusContainer>
    </TodoBody>
  );
}

export default TodoBoard;
