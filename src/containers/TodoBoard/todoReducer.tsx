import { ADD_TODO, REMOVE_TODO, MARK_COMPLETED, TodoAction,  TodoProps, TodoReducerState, TodoBase } from "./models/Todo.interface";

export const initialTodoState: TodoReducerState = {
  todos: [],
};

const todoReducer = (
  state: TodoReducerState,
  action: TodoAction
): TodoReducerState => {
  switch (action.type) {
    case ADD_TODO: {
      const randomId = [...Array(9)].map(() => (~~(Math.random() * 36)).toString(36)).join('')

      const newTodo: TodoProps = {
        id: randomId,
        status: 'undone',
        ...(action.payload as TodoProps),
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }
    case MARK_COMPLETED: {
      const findIndex = state.todos.findIndex(todo => todo.id === action.payload)
      const todos = [ ...state.todos ]

      todos[findIndex].status = 'done'

      return {
        ...state,
        todos 
      } 
    }
    case REMOVE_TODO: {
      const filteredTodos = state.todos
        .filter((todo: TodoBase) => todo.id !== action.payload)

      return {
        ...state,
        todos: filteredTodos
      }
    }
    default:
      throw Error();
  }
};

export default todoReducer;
