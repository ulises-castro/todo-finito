import React, { ReactElement } from "react";

import TodoItem from 'components/TodoItem'

// TODO: Todos elements 
export interface TodoContainerProps {
  todos: any; 
}

export default function TodoContainer(
  { todos }: TodoContainerProps
): ReactElement | null {
  return (
    <>
      { todos.map((todo: any) => <TodoItem todo={todo} />) }
    </>
  );
}
