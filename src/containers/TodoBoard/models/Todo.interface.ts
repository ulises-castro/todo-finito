export interface TodoBase {
  id?: String;
  title: String;
  body?: String;
  date?: Date;
  status?: "un-done" | "in-progress" | "completed";
}

export interface TodoProps extends TodoBase {
  subtasks?: TodoBase[];
}

export type TodoReducerState = {
  todos: TodoProps[];
};

export type handlerTodoType = (todoId: string) => void 

export type TodoUpdateType = {
    todoId: string;
    data: TodoBase;
}

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const MARK_COMPLETED = 'MARK_COMPLETED'
export const UPDATE_TODO = 'UPDATE_TODO'

export type TodoAction =
  | { type: typeof ADD_TODO; payload: TodoBase }
  | { type: typeof REMOVE_TODO; payload: string }
  | { type: typeof MARK_COMPLETED; payload: string }
  | { type: typeof UPDATE_TODO; payload: TodoUpdateType  }; 
