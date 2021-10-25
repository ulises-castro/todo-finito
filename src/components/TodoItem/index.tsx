import React, { ReactElement, useState } from "react";
import DeleteBtn from "components/DeleteBtn";
import EditBtn from "components/EditBtn";
import CheckBtn from "components/CheckBtn";
import { Flex, SimpleBtn, SForm, SInput } from "css-components";
import { Todo, TodoActions, HorizontalLine, TodoEditCSS } from "./styled";

import { TodoBase, handlerTodoType, handleTodoBaseType } from "containers/TodoBoard/models/Todo.interface";

// NOTE: Once you use rest to pass an array of methods you lose because typescript lack of features to work
// TODO: Remove any type and asign a real type for "handleEditTodo"
export interface TodoItemProps {
  todo: TodoBase;
  handleEditTodo: handleTodoBaseType;
  handleRemoveTodo: handlerTodoType;
  handleToggleCompleted: handlerTodoType;
}

export default function TodoItem({
  todo,
  handleEditTodo,
  handleRemoveTodo,
  handleToggleCompleted,
}: TodoItemProps): ReactElement | null {
  const [showEdit, setShowEdit] = useState<Boolean>(false);
  const [showDeleteAnimation, setShowDeleteAnimation] =
    useState<Boolean>(false);

  const [value, setValue] = useState(todo.title);

  const todoNode = React.useCallback((node: HTMLDivElement) => {
    function functionFactory() {
      handleRemoveTodo(todo.id)
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

  const isTodoCompleted = todo.status === "completed";

  const onClickToggleCompleted = (event: React.MouseEvent<HTMLElement>) => {
    handleToggleCompleted(todo.id);
  };

  return (
    <div style={{ position: "relative", padding: "5px 0" }}>
      <Todo
        key={todo.id}
        completed={isTodoCompleted}
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
