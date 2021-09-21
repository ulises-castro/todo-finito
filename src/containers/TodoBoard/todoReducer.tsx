import { TodoReducerProps, TodoBase } from "./models/Todo.interface";

export const initialTodoState: TodoReducerProps = {
  todos: [],
};

const todoReducer = (
  state: TodoReducerProps | any,
  action: { payload: TodoBase | number | object; type: string }
) => {
  switch (action.type) {
    case "ADD_TODO": {
      const randomId =[ ...Array(9) ].map(() => (~~(Math.random() * 36)).toString(36)).join('')

      const newTodo: TodoBase = {
        id: randomId,
        status: 'undone',
        ...(action.payload as TodoBase),
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }
    case "REMOVE_TODO": {
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
