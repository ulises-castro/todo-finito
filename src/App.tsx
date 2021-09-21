import React, { useReducer } from 'react';
import logo from './logo.svg';

import './App.css';

interface TaskBaseProps {
  title: String,
  body: String,
  date: Date, 
}

interface TaskProps extends TaskBaseProps {
  subtasks: TaskBaseProps[]
}
 
interface TodoReducerProps {
  todos: TaskProps[]
}
  
// Issue here, Idk why but it has issues about the type
const initialTodoState: TodoReducerProps = {
  todos: []
} 

const todoReducer = (state: TodoReducerProps, action: { payload: string | number, type: string })  =>{
  switch (action.type) {
    case 'ADD_TODO': 
      return state;
    case 'REMOVE_TODO':
      return state;
    default:
      throw Error()
  }
}


function App() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
