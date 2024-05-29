import { useContext } from "react";
import { createContext } from "react";

export const TodoContext = createContext();

export const initialState = {
  todos: [
    // {
    //   id: Date.now(),
    //   title: "",
    //   isChecked: false,
    // },
  ],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODOS":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.payload,
            isChecked: false,
          },
        ],
      };
    case "DELETE_TODOS":
      return {
        ...state,
        todos: [...state.todos.filter((item) => item.id !== action.payload)],
      };

    case "TOGGLE_TODOS":
      return {
        ...state,
        todos: [
          ...state.todos.map((item) =>
            item.id === action.payload
              ? { ...item, isChecked: !item.isChecked }
              : item
          ),
        ],
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: [
          ...state.todos.map((item) =>
            item.id === action.payload.id
              ? { ...item, title: action.payload.title }
              : item
          ),
        ],
      };
    case "ADD_REMINDERS":
      return {
        ...state,
        todos: [
          ...state.todos.map((item) =>
            item.id === action.payload.reminderId
              ? {
                  ...item,
                  date: action.payload.date,
                  time: action.payload.time,
                }
              : item
          ),
        ],
      };

    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
