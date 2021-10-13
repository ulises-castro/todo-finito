import React, { ReactElement, useState } from "react";
import DeleteBtn from "components/DeleteBtn";
import EditBtn from "components/EditBtn";
import CheckBtn from "components/CheckBtn";
import { Flex, SimpleBtn, Form, Input } from "css-components";
import { Todo, TodoActions, HorizontalLine, TodoEditCSS } from "./styled";

import { handlerTodoType } from "containers/TodoBoard/models/Todo.interface";

// NOTE: Once you use rest to pass an array of methods you lose because typescript lack of features to work
// TODO: Remove any type and asign a real type for "handlerEditTodo"
export interface TodoItemProps {
  todo: any;
  handlerEditTodo?: any;
  handlerRemoveTodo: handlerTodoType;
  handleToggleCompleted: handlerTodoType;
}

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

  const TodoEdit = () => {
    let todoEditBodyJSX = showEdit ? (
      <Form onSubmit={handlerUpdateTodoTitle}>
        <Flex alignItems="center">
          <Input
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
      </Form>
    ) : (
      todo.title
    );

    return (
      <TodoEditCSS completed={isTodoCompleted}>{todoEditBodyJSX}</TodoEditCSS>
    );
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

        <TodoEdit />

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
