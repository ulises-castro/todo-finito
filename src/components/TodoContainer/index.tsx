import React, { ReactElement } from "react";
import styled from 'styled-components'


// TODO: Todos elements types instead of "any"
export interface TodoContainerProps {
  // children: React.ReactElement[]; 
  children: any;
}

// TODO: Fix flex containers growing so they are reducing themself
const TodoContainerUI = styled.section`
  flex: 1 0 auto;
  background: #e8ddb5;
  border: 1px solid;
  border-radius: 5px;
`;

export default function TodoContainer(
  props: TodoContainerProps
): ReactElement | null {
  return (
    <TodoContainerUI>
      { props.children }
    </TodoContainerUI>
  );
}
