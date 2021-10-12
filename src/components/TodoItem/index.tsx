import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import DeleteBtn from "components/DeleteBtn";
import EditBtn from "components/EditBtn";
import CheckBtn from "components/CheckBtn";
import { handlerTodoType } from "containers/TodoBoard/models/Todo.interface";
import { ShadowBox, Flex, SimpleBtn } from "containers/TodoBoard/styled";

// NOTE: Once you use rest to pass an array of methods you lose because typescript lack of features to work
// TODO: Remove any type and asign a real type for "handlerEditTodo"
export interface TodoItemProps {
  todo: any;
  handlerEditTodo?: any;
  handlerRemoveTodo: handlerTodoType;
  handleToggleCompleted: handlerTodoType;
}

//TODO: Specify what kind of type is position using an interface
//TODO: In the outer type you can move the completed types to inner and reduce code
//TODO: Change position props for style.
//TODO: Compose Drag-Drop in a components to re-used it
const Todo = styled(ShadowBox).attrs<{ position: any }>(({ position }) => ({
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

const HorizontalLine = styled.div`
  height: 2px;
  width: 0%;
  background: #ff1c1c;
  position: absolute;
  top: calc(50% - 1px);
  right: 32px;

  ${(props: { showAnimation: Boolean }) =>
    props.showAnimation
      ? ` 
  animation-name: drawLine;
  animation-duration: 1500ms;

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

const TodoTitle = styled.div`
  text-decoration: ${(props: { completed: Boolean }) =>
    props.completed ? `line-through` : `none`};
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: start;
`;
const TodoActions = styled.div`
  display: flex;
`;
const Input = styled.input``;

let lastElementFromPoint: any = null;

export default function TodoItem({
  todo,
  handlerEditTodo,
  handlerRemoveTodo,
  handleToggleCompleted,
}: TodoItemProps): ReactElement | null {
  const [showEdit, setShowEdit] = useState<Boolean>(false);
  const [showDeleteAnimation, setShowDeleteAnimation] =
    useState<Boolean>(false);
  const [todoPosition, setTodoPosition] = useState<{
    top: number;
    left: number;
    hidden?: boolean;
  }>({ top: 0, left: 0, hidden: false });

  const [value, setValue] = useState(todo.title);

  const todoNode: any = React.useCallback((node: any) => {
    function functionFactory() {
      handlerRemoveTodo(todo.id);
    }

    if (node !== null) {
      node.addEventListener("animationend", functionFactory);
    }
  }, []);

  const handlerUpdateTodoTitle = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    handlerEditTodo({ ...todo, title: value });
    setShowEdit(false);
  };

  const onMouseMove = React.useCallback((event: any) => {
    setTodoPosition({ top: event.pageY, left: event.pageX, hidden: true });

    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    lastElementFromPoint = elemBelow;

    setTodoPosition({ top: event.pageY, left: event.pageX });
  }, []);

  const handlerMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    document.addEventListener("mousemove", onMouseMove);
  };

  const handlerMouseUp = () => {
    setTodoPosition({ top: 0, left: 0 });

    if (
      lastElementFromPoint &&
      lastElementFromPoint.className.includes("droppable-element")
    ) {
      const status = lastElementFromPoint.className.split("--")[1];
      handlerEditTodo({ ...todo, status });
    }

    lastElementFromPoint = null;
    document.removeEventListener("mousemove", onMouseMove);
  };

  const isTodoCompleted = todo.status === "completed";

  const onClickToggleCompleted = (event: React.MouseEvent<HTMLElement>) => {
    handleToggleCompleted(todo.id);
  };

  return (
    <div style={{ position: "relative", padding: "5px 0" }}>
      <Todo
        key={todo.id}
        completed={isTodoCompleted}
        position={todoPosition}
        ref={todoNode}
      >
        <Flex style={{ padding: "15px" }}>
          <CheckBtn
            onClick={onClickToggleCompleted}
            showIcon={isTodoCompleted}
          />
        </Flex>
        <TodoTitle onClick={() => false} completed={isTodoCompleted}>
          {showEdit ? (
            <form onSubmit={handlerUpdateTodoTitle}>
              <Input
                type="text"
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(event.target.value)
                }
              />
              <button type="submit"> Ok </button>
              <button type="button" onClick={() => setValue("")}>
                Clear
              </button>
            </form>
          ) : (
            todo.title
          )}
        </TodoTitle>

        {todo.status !== "completed"}
        <TodoActions>
          {showEdit ? (
            <>
              <Flex
                onClick={() => setShowEdit(true)}
                style={{ padding: "15px 0 15px 15px " }}
              >
                <SimpleBtn> Ok </SimpleBtn>
              </Flex>
              <Flex
                onClick={() => setShowEdit(true)}
                style={{ padding: "15px 5px 15px 15px " }}
              >
                <SimpleBtn> Cancel </SimpleBtn>
              </Flex>
            </>
          ) : (
            <>
              <Flex
                onClick={() => setShowEdit(true)}
                style={{ padding: "15px 5px 15px 15px " }}
              >
                <EditBtn />
              </Flex>
              <Flex
                onClick={() => setShowDeleteAnimation(true)}
                style={{ padding: "15px 15px" }}
              >
                <DeleteBtn />
              </Flex>
            </>
          )}
        </TodoActions>

        <HorizontalLine showAnimation={showDeleteAnimation} />
      </Todo>
    </div>
  );
}
