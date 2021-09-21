import React, { useReducer } from "react";
import styled from "styled-components";
import TodoBoard from './containers/TodoBoard'

function App() {
  return (
    <div style={{background: '#373F51'}}>
      <TodoBoard />
    </div>
  );
}

export default App;
