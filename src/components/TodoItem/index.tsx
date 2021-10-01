import React, { ReactElement, useState } from "react";
import { handlerTodoType } from "containers/TodoBoard/models/Todo.interface";
import styled from "styled-components";

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
const Todo = styled.div.attrs<{ position: any }>((props) => ({
  style: {
    position: props.position.top ? "absolute" : "initial",
    top: `${props.position.top}px`,
    left: `${props.position.left}px`,
    display: props.position.hidden ? "none" : "flex",
  },
}))<{ position: any }>`
  background: white;
  -webkit-box-shadow: -1px 6px 11px 0px rgba(50, 50, 50, 0.38);
  -moz-box-shadow: -1px 6px 11px 0px rgba(50, 50, 50, 0.38);
  box-shadow: -1px 6px 11px 0px rgba(50, 50, 50, 0.38);
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 5px;
  &:hover {
    background: red;
    cursor: pointer;
  }
`;

const TodoTitle = styled.div``;
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
  const [todoPosition, setTodoPosition] = useState<{
    top: number;
    left: number;
    hidden?: boolean;
  }>({ top: 0, left: 0, hidden: false });

  const [value, setValue] = useState(todo.title);

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

  const handlerMouseUp = (event: React.MouseEvent<HTMLElement>) => {
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
    <Todo
      key={todo.id}
      position={todoPosition}
      onMouseUp={handlerMouseUp}
      onMouseDown={handlerMouseDown}
      onMouseEnter={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
    >
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
        <button onClick={() => handlerMarkAsDone(todo.id)}>Done</button>
        <button onClick={() => handlerRemoveTodo(todo.id)}>Delete</button>
      </TodoActions>
    </Todo>
  );
}
