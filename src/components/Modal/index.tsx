import React, { ReactElement } from "react"
import { TodoBase } from 'containers/TodoBoard/models/Todo.interface'

export interface ModalProps {
  todo: TodoBase;
  updateTodo: (todoData: TodoBase) => TodoBase;
}

export default function Modal(props: ModalProps): ReactElement | null {
  return null
}
