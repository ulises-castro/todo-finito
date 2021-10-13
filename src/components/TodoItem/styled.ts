import styled from "styled-components";
import { ShadowBox } from "css-components";

// NOTE: MOVE THIS AND COMPOSE INTO A DRAG-DROP FEATURE
//TODO: Specify what kind of type is position using an interface
//TODO: In the outer type you can move the completed types to inner and reduce code
//TODO: Change position props for style.
//TODO: Compose Drag-Drop in a components to re-used it
export const Todo = styled(ShadowBox).attrs<{ position: any }>(({ position }) => ({
  style: {
    position: position.top ? "absolute" : "initial",
    top: `${position.top}px`,
    left: `${position.left}px`,
    display: position.hidden ? "none" : "flex",
  },
}))<{ position: any; completed: Boolean }>`
  background: white;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  opacity: ${({ completed }) => (completed ? ".5" : "1")};

  &:hover {
    opacity: 1;
  }
`;

// TODO: Remove plain keyframes in favor of use of keyframes helper
export const HorizontalLine = styled.div`
  height: 2px;
  width: 0%;
  background: #ff1c1c;
  position: absolute;
  top: calc(50% - 1px);
  right: 20px;

  ${(props: { showAnimation: Boolean }) =>
    props.showAnimation
      ? ` 
  animation-name: drawLine;
  animation-duration: 1200ms;

  @keyframes drawLine {
    from {
      width: 5%;
    }

    to {
      width: 90%;
    }
  }
  `
      : "display: none"}
`;

export const TodoEditCSS = styled.div`
  text-decoration: ${(props: { completed: Boolean }) =>
    props.completed ? `line-through` : `none`};
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: start;
`;
 
export const TodoActions = styled.div`
  display: flex;
`;

