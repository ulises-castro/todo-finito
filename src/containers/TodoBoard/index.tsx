import React, { useReducer, MouseEvent, useState } from "react";
import TodoContainer from "components/TodoContainer";
import TodoItem from "components/TodoItem";
import { TodoStatusContainer, SimpleBtn, TodoBody, ActionBar, Header } from "./styled";

import todoReducer, { initialTodoState } from "./todoReducer";
import { TodoProps, handlerTodoType, TodoBase } from "./models/Todo.interface";

function TodoBoard() {
  const [listMode, setListMode] = useState<"board"| "list" | "">('');
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  const handlerAddTodo = () => {
    const payload: TodoProps = {
      title: "test",
      body: "hi there",
      date: new Date(),
    };

    dispatch({ type: "ADD_TODO", payload });
  };

  const handlerRemoveTodo: handlerTodoType = (todoId) => {
    dispatch({ type: "REMOVE_TODO", payload: todoId });
  };

  const handlerMarkAsDone: handlerTodoType = (todoId) => {
    dispatch({ type: "MARK_COMPLETED", payload: todoId });
  };

  const handlerEditTodo = (todoId: string, data: TodoBase): void => {
    dispatch({ type: "UPDATE_TODO", payload: { todoId, data } });
  };

  const filterTodosBy: any = (status = "") =>
    state.todos
  .filter((todo: any) => (status) ? todo.status === status : true)
      .map((todo: any) => (
        <TodoItem
          // TODO: Create its own type for this because it is used more than once 
          handlerEditTodo={(data: TodoBase) =>
            handlerEditTodo(todo.id, data)
          }
          handlerMarkAsDone={handlerMarkAsDone}
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
        <div>
          <SimpleBtn onClick={handlerAddTodo}>Add Todo</SimpleBtn>
        </div>
        <div>
          <SimpleBtn onClick={() => setListMode('')}>
            Mode: listMode
          </SimpleBtn>
        </div>
      </ActionBar>
      <TodoStatusContainer direction={listMode}>
        <TodoContainer title="Tasks">{filterTodosBy()}</TodoContainer>
        { (listMode) && (
          <>
        <TodoContainer title="Un-Done">{filterTodosBy("un-done")}</TodoContainer>
        <TodoContainer title="In-Progress">
          {filterTodosBy("in-progress")}
        </TodoContainer>
        <TodoContainer title="Completed">{filterTodosBy('completed')} </TodoContainer>
          </>
        ) }
      </TodoStatusContainer>
    </TodoBody>
  );
}

export default TodoBoard;
