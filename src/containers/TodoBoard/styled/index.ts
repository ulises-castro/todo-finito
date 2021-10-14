import styled from "styled-components";
import { SimpleBtn, Input } from 'css-components'

export const TodoBody = styled.div`
  display: grid;
  background-color: #fafcff;
  justify-content: center;
  grid-template-areas:
    "header"
    "action-bar"
    "todo-container";
  height: 100vh;
  width: 100vw;
`;

export const ActionBar = styled.section`
  grid-area: action-bar;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ITodoStatusContainer {
  direction?: string;
}

export const TodoStatusContainer = styled.section<ITodoStatusContainer>`
  grid-area: todo-container;
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
  height: 500px;
  width: 800px;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: space-between;
`;

export const SquareBtn = styled(SimpleBtn)`
  padding: 10px; 
  text-transform: uppercase;
  border-radius: 0;
`

export const SquareInput = styled(Input)`
  border-radius: none;
  border-right: none;
`
