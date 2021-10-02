import styled from "styled-components";
import { InvertedBtn } from "components/Button";

// NOTE: REmove this after aply new styles
  // background: ${() => {
  //   let back = "";

  //   for (let i = 1; i < 25; i++) {
  //     for (let j = 1; j < 15; j++) {
  //       const ifEvenPlus = !(i % 2) ? 50 : 1;

  //       back += `url("skull.svg") calc(100% - ${10 * i * 10 - ifEvenPlus}px) calc(100% - ${
  //         ( 100 * j - ifEvenPlus) 
  //       }px) / 50px no-repeat,`;
  //     }
  //   }

  //   return back.slice(0, -1);
  // }}; 

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

export const Header = styled.header`
  display: flex;
  justify-content: center;
  & h1 {
    font-size: 3.5rem;
    color: var(--primary-font-color);
  }
`

export const ActionBar = styled.section`
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
