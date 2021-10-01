import styled from "styled-components";
import { InvertedBtn } from "components/Button";

export const TodoBody = styled.div`
  --bg_1: url("skull.svg") calc(100% - 55px) / 50px no-repeat;
  --bg_2: url("skull.svg") top 10px right 10px / 50px no-repeat;
  --bg_3: url("skull.svg") bottom 10px right 10px / 50px no-repeat;
  --bg_4: url("skull.svg") bottom 10px left 10px / 50px no-repeat;

  background: ${() => {
    let back = "";
    const randomX = [20, 30, 50];
    for (let i = 1; i < 25; i++) {
      for (let j = 1; j < 25; j++) {
        const ifEvenPlus = !(i % 2) ? 200 : 1;

        back += `url("skull.svg") calc(100% - ${10 * i * 10 - ifEvenPlus}px) calc(100% - ${
          ( 50 * j ) - ifEvenPlus 
        }px) / 50px no-repeat,`;
        // back += `url("skull.svg") calc(100% - ${15 * i * 10}px) calc(100% - ${
        //   10 * i * 25
        // }px) / 50px no-repeat,`;
        // back += `url("skull.svg") calc(100% - ${1 * i * 10}px) calc(100% - ${
        //   10 * i * 25
        // }px) / 50px no-repeat,`;
      }
    }

    return back.slice(0, -1);
  }};
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
