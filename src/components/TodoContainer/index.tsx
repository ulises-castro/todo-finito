import React, { ReactElement } from "react";
import styled from 'styled-components'

import TodoItem from 'components/TodoItem'

// TODO: Todos elements 
export interface TodoContainerProps {
  todos: any; 
}

// HACK: 
// TODO: Fix flex containers growing so they are reducing themself
const TodoContainerUI = styled.section`
  flex: 1 0 auto;
  background: #e8ddb5;
  border: 1px solid;
  border-radius: 5px;
`;

export default function TodoContainer(
  { todos }: TodoContainerProps
): ReactElement | null {
  return (
    <TodoContainerUI>
      { todos.map((todo: any) => <TodoItem todo={todo} />) }
    </TodoContainerUI>
  );
}
