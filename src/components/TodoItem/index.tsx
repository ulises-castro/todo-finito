import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import DeleteBtn from "components/DeleteBtn";
import CheckBtn from "components/CheckBtn";
import { handlerTodoType } from "containers/TodoBoard/models/Todo.interface";
import { ShadowBox } from "containers/TodoBoard/styled";

// NOTE: Once you use rest to pass an array of methods you lose because typescript lack of features to work
// TODO: Remove any type and asign a real type for "handlerEditTodo"
export interface TodoItemProps {
  todo: any;
  handlerEditTodo?: any;
  handlerRemoveTodo: handlerTodoType;
  handlerMarkAsDone: handlerTodoType;
}

//TODO: Specify what kind of type is position
//TODO: Change position props for style.
//TODO: Compose Drag-Drop in a components to re-used it
const Todo = styled(ShadowBox).attrs<{ position: any }>((props) => ({
  style: {
    position: props.position.top ? "absolute" : "initial",
    top: `${props.position.top}px`,
    left: `${props.position.left}px`,
    display: props.position.hidden ? "none" : "flex",
  },
}))<{ position: any }>`
  background: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 5px;
  &:hover {
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
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: start;
`;
const TodoActions = styled.div``;
const Input = styled.input``;

let lastElementFromPoint: any = null;

export default function TodoItem({
  todo,
  handlerEditTodo,
  handlerRemoveTodo,
  handlerMarkAsDone,
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

  // TODO: Compose this animations listeners into a component in order to divide responsabilities, following SOLID princicples.
  // NOTE: Check the animation for mark as completed (checked tasks as well)
  React.useEffect(() => {
    function functionFactory() {
      console.log('hola')    
      handlerRemoveTodo(todo.id)
    }

    document.addEventListener('animationend', functionFactory)

    return () => {
      document.removeEventListener('animationend', functionFactory)
    }
  }, [])

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

  return (
    <div style={{ position: "relative", padding: "5px 0" }}>
      <Todo
        key={todo.id}
        position={todoPosition}
        //onMouseUp={handlerMouseUp}
        //onMouseDown={handlerMouseDown}
        onMouseEnter={() => setShowEdit(true)}
        onMouseLeave={() => setShowEdit(false)}
      >
        <CheckBtn onClick={() => handlerMarkAsDone(todo.id)} />
        <TodoTitle onClick={() => false}>
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

        <TodoActions>
          <div onClick={() => setShowDeleteAnimation(true)}>
            <DeleteBtn />
          </div>
        </TodoActions>
      </Todo>
      <HorizontalLine showAnimation={showDeleteAnimation} />
    </div>
  );
}
