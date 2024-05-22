import { TodoContext, initialState, reducer } from "./State";
import Todos from "./components/Todos";
import { useEffect, useReducer } from "react"

const App = () => {
  const[state,dispatch] = useReducer(reducer,initialState)
  
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      dispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem('todos' , JSON.stringify(state.todos))
  },[state])

  return (
  <TodoContext.Provider value={{state,dispatch}}>
    <Todos/>
  </TodoContext.Provider>
  );
};

export default App;
