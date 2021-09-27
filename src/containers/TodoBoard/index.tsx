import React, { useReducer, MouseEvent, useState } from "react";
import TodoContainer from "components/TodoContainer";
import TodoItem from "components/TodoItem";
import { TodoStatusContainer, SimpleBtn, TodoBody, ActionBar } from "./styled";

import todoReducer, { initialTodoState } from "./todoReducer";
import { TodoProps, handlerTodoType } from "./models/Todo.interface";

function TodoBoard() {
  const [listMode, setListMode] = useState<Boolean>(true);
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

  const handlerEditTodo = (todoId: string, newTitle: string) => {
    dispatch({ type: "UPDATE_TODO_TITLE", payload: { todoId, newTitle } });
  };

  const filterTodosBy: any = (status = "done") =>
    state.todos
      .filter((todo: any) => todo.status === status)
      .map((todo: any) => (
        <TodoItem
          // TODO: Create its own type for this because it is used more than once 
          handlerEditTodo={(newTitle: string) =>
            handlerEditTodo(todo.id, newTitle)
          }
          handlerMarkAsDone={handlerMarkAsDone}
          handlerRemoveTodo={handlerRemoveTodo}
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
        <TodoContainer title="Un-Done">{filterTodosBy("undone")}</TodoContainer>
        <TodoContainer title="In Progress">
          {filterTodosBy("doing")}
        </TodoContainer>
        <TodoContainer title="Completed">{filterTodosBy()} </TodoContainer>
      </TodoStatusContainer>
    </TodoBody>
  );
}

export default TodoBoard;
