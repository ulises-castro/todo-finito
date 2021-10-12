import styled from "styled-components";
import { InvertedBtn } from "components/Button";

// TODO: Move this into another file 

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

export const ShadowBox = styled.div`
  background: white;
  -webkit-box-shadow: 0px 0px 6px 1px #eceff5;
  box-shadow: 0px 0px 6px 1px #eceff5;
  &:hover {
    -webkit-box-shadow: 0px 0px 8px 1px #e3e3e3;
    box-shadow: 0px 0px 8px 1px #e3e3e3;
    cursor: pointer;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  & h1 {
    font-size: 3.5rem;
    font-weight: 100;
    color: var(--primary-font-color);
  }
`;

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

interface FlexProps {
  padding?: string,
  justifyContent?: string,
}

export const Flex = styled.div.attrs<FlexProps>(({ padding, justifyContent }) => ({
  style: {
    display: "flex",
    padding: padding || 'initial', 
    justifyContent: justifyContent || 'initial',
  }
}))<FlexProps>``;

export const Form = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
