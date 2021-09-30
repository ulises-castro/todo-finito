import styled from 'styled-components'
import { InvertedBtn } from "components/Button";

export const TodoBody = styled.div`
  display: grid;
  background-color: #344fa1;
  justify-content: center;
  grid-template-areas:
    "action-bar"
    "todo-container";
  height: 100vh;
  width: 100vw;
`;

export const ActionBar = styled.header`
  grid-area: action-bar;
  display: flex;
  align-items: center;
  justify-content: end;
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

export const SimpleBtn = styled(InvertedBtn)``;
 
