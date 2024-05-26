import { TodoContext, initialState, reducer } from "./State";
import Todos from "./components/Todos";
import { useEffect, useReducer } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    <ToastContainer />
  </TodoContext.Provider>
  );
};

export default App;
