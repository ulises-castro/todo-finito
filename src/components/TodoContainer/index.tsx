import React, { ReactElement } from "react";
import styled from 'styled-components'

export interface TodoContainerProps {
  children: React.ReactElement[]; 
  title: string;
}

// TODO: Fix flex containers growing so they are reducing themself
const TodoContainerCSS = styled.section`
  flex: 1 0 auto;
  border-radius: 5px;
  & h2 {
    font-weight: 300;
  }
`;

export default function TodoContainer(
  { title, children }: TodoContainerProps
): ReactElement | null {
  // TODO: Compose droppable elements into its own component
  return (
    <TodoContainerCSS className={`droppable-element--${title.toLowerCase()}`}>
      <h2> { title } </h2>
      { children }
    </TodoContainerCSS>
  );
}
