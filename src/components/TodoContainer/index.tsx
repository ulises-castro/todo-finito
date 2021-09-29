import React, { ReactElement } from "react";
import styled from 'styled-components'

// TODO: Assigned correct ones types instead of "any"
export interface TodoContainerProps {
  // children: React.ReactElement[]; 
  children: any;
  title: string;
}

// TODO: Fix flex containers growing so they are reducing themself
const TodoContainerUI = styled.section`
  flex: 1 0 auto;
  border-radius: 5px;
`;

export default function TodoContainer(
  { title, children }: TodoContainerProps
): ReactElement | null {
  return (
    <TodoContainerUI className={`droppable-element--${title.toLowerCase()}`}>
      <h1> { title } </h1>
      { children }
    </TodoContainerUI>
  );
}
