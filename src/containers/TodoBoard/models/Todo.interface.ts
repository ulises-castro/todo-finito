export interface TodoBase {
  id?: Number | String;
  title: String;
  body: String;
  date?: Date;
  status?: "undone" | "doing" | "done";
}

export interface TodoProps extends TodoBase {
  subtasks?: TodoBase[];
}

export type TodoReducerState = {
  todos: TodoProps[];
};

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

export type TodoAction =
  | { type: typeof ADD_TODO; payload: TodoBase }
  | { type: typeof REMOVE_TODO; payload: number };
