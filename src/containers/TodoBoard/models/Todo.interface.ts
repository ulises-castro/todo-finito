export interface TodoBase {
  id: string;
  title: string;
  body?: string;
  date?: Date;
  status?: "un-done" | "in-progress" | "completed";
}

export interface TodoProps extends TodoBase {
  subtasks?: TodoBase[];
}

export type TodoPreviewProps = Omit<TodoProps, 'id'>

export type TodoReducerState = {
  todos: TodoProps[];
};

export type handlerTodoType = (todoId: string) => void 
export type handleTodoBaseType = (data: TodoBase) => void 
export type handleEditTodoType = (todoId: string, data: TodoBase) => void

export type TodoUpdateType = {
    todoId: string;
    data: TodoBase;
}

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const MARK_COMPLETED = 'MARK_COMPLETED'
export const TOGGLE_COMPLETED_STATUS = 'TOGGLE_COMPLETED_STATUS'
export const UPDATE_TODO = 'UPDATE_TODO'

export type TodoAction =
  | { type: typeof ADD_TODO; payload: TodoPreviewProps }
  | { type: typeof REMOVE_TODO; payload: string }
  | { type: typeof MARK_COMPLETED; payload: string }
  | { type: typeof TOGGLE_COMPLETED_STATUS; payload: string } 
  | { type: typeof UPDATE_TODO; payload: TodoUpdateType  }; 
