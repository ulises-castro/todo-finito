import React, { ReactElement, useState } from "react";
import DeleteBtn from "components/DeleteBtn";
import EditBtn from "components/EditBtn";
import CheckBtn from "components/CheckBtn";
import { Flex, SimpleBtn, SForm, SInput } from "css-components";
import { Todo, TodoActions, HorizontalLine, TodoEditCSS } from "./styled";

import { TodoBase, handlerTodoType, handleEditTodoType } from "containers/TodoBoard/models/Todo.interface";

// NOTE: Once you use rest to pass an array of methods you lose because typescript lack of features to work
// TODO: Remove any type and asign a real type for "handleEditTodo"
export interface TodoItemProps {
  todo: TodoBase;
  handleEditTodo?: handleEditTodoType;
  handleRemoveTodo: handlerTodoType;
  handleToggleCompleted: handlerTodoType;
}

let lastElementFromPoint: any = null;

export default function TodoItem({
  todo,
  handleEditTodo,
  handleRemoveTodo,
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

  const todoNode: any = React.useCallback((node: HTMLElement) => {
    function functionFactory() {
    }

    if (node !== null) {
      node.addEventListener("animationend", functionFactory);
    }
  }, []);

  const handlerUpdateTodoTitle = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    handleEditTodo({ ...todo, title: value });
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
      handleEditTodo({ ...todo, status });
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
        <Flex padding="15px">
          <CheckBtn
            onClick={onClickToggleCompleted}
            showIcon={isTodoCompleted}
          />
        </Flex>

        <TodoEditCSS completed={isTodoCompleted}>
          {showEdit ? (
            <SForm onSubmit={handlerUpdateTodoTitle}>
              <Flex alignItems="center">
                <SInput
                  type="text"
                  value={value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(event.target.value)
                  }
                />
              </Flex>

              <Flex padding="0 15px">
                <div style={{ padding: "15px 0 15px 15px " }}>
                  <SimpleBtn type="submit"> Ok </SimpleBtn>
                </div>
                <div
                  onClick={() => setShowEdit(false)}
                  style={{ padding: "15px 5px 15px 15px " }}
                >
                  <SimpleBtn> Cancel </SimpleBtn>
                </div>
              </Flex>
            </SForm>
          ) : (
            todo.title
          )}
        </TodoEditCSS>

        {!showEdit && (
          <TodoActions>
            <Flex
              onClick={() => setShowEdit(true)}
              padding="15px 5px 15px 15px"
            >
              <EditBtn />
            </Flex>
            <Flex
              onClick={() => setShowDeleteAnimation(true)}
              padding="15px 15px"
            >
              <DeleteBtn />
            </Flex>
          </TodoActions>
        )}

        <HorizontalLine showAnimation={showDeleteAnimation} />
      </Todo>
    </div>
  );
}
