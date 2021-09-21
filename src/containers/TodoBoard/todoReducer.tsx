import { TodoReducerProps, TodoBase  } from './models/Todo.interface'

export const initialTodoState: TodoReducerProps = {
  todos: []
} 

const todoReducer = (state: TodoReducerProps | any, action: { payload: TodoBase | number| object, type: string })  =>{
  switch (action.type) {
    case 'ADD_TODO': {
       const newTodo: TodoBase = {
        id: state.todos.length + 1,
         ...( action.payload as TodoBase ) 
      }

      return {
      ...state,
      todos: [...state.todos, newTodo]
    };   
    }
    
    case 'REMOVE_TODO': 
      return state;
    default:
      throw Error()
  }
} 

export default todoReducer
