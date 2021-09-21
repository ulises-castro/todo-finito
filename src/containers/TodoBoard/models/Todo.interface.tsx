export interface TodoBase {
  id?: Number | String,
  title: String,
  body: String,
  date: Date, 
  status?: "undone" | "doing" | "done"
}

export interface TaskProps extends TodoBase {
  subtasks: TodoBase[]
}
 
export interface TodoReducerProps {
  todos: TaskProps[]
}
 
