import {                           
  ADD_TODO,
  REMOVE_TODO,
  MARK_COMPLETED,
  TOGGLE_COMPLETED_STATUS,
  UPDATE_TODO,
  TodoAction,
  TodoProps,
  TodoReducerState,
  TodoBase,
} from "./models/Todo.interface";

import { getRandomAlphanumeric } from 'utils/helpers'

const defaultTodo: TodoBase = {
  id: "Hxd324Jsi",
  title: "First Todo",
  status: "un-done",
  date: new Date(),
};

export const initialTodoState: TodoReducerState = {
  todos: [defaultTodo],
};

const todoReducer = (
  state: TodoReducerState,
  action: TodoAction
): TodoReducerState => {
  switch (action.type) {
    case ADD_TODO: {
      const randomId = getRandomAlphanumeric(9)

      const newTodo: TodoProps = {
        id: randomId,
        status: "un-done",
        ...(action.payload as TodoProps),
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }
    case TOGGLE_COMPLETED_STATUS: {
      const findIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      ); 
      const todos = [...state.todos];


      let targetTodo = todos[findIndex]
      const newStatus = targetTodo.status !== 'completed' ? 'completed' : 'un-done'

      console.log(action.payload, newStatus)

      todos[findIndex] = {
        ...targetTodo,
        status: newStatus
      }
 
      return {
        ...state,
        todos
      }
    }
    case MARK_COMPLETED: {
      const findIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      const todos = [...state.todos];

      todos[findIndex].status = "completed";

      return {
        ...state,
        todos,
      }
    }
    case UPDATE_TODO: {
      const findIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      const todos = [...state.todos];

      console.log(action.payload)
      todos[findIndex] = action.payload.data; 

      return {
        ...state,
        todos
      }  
    }
    case REMOVE_TODO: {
      const filteredTodos = state.todos.filter(
        (todo: TodoBase) => todo.id !== action.payload
      );

      return {
        ...state,
        todos: filteredTodos,
      };
    }
    default:
      throw Error();
  }
};

export default todoReducer;
