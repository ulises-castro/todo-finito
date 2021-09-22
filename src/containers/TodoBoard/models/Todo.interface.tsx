export interface TodoBase {
  id?: Number | String,
  title: String,
  body: String,
  date?: Date, 
  status?: "undone" | "doing" | "done" 
}

export type TodoAction = 
  | { type: "ADD_TODO", payload: TodoBase }
  | { type: "REMOVE_TODO", payload: number  }

// export type TodoState = {
//   todos: TaskProps[]
// }

export interface TodoProps extends TodoBase {
  subtasks?: TodoBase[]
}
 
export type TodoReducerState = {
  todos: TodoProps[]
}
 
