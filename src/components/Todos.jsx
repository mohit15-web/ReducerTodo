import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../State";
import Modal from "./Modal";
import { toast } from "react-toastify";

function Todos() {
  const { state, dispatch } = useContext(TodoContext);
  console.log(state);
  const [text, setText] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filtredState, setFiltredState] = useState([]);
  const [modal, setModal] = useState(false);
  const [reminderId, setReminderId] = useState(null);
  useEffect(() => {
    setFiltredState(state.todos);
  }, [state]);

  const addTodo = () => {
    if(text === "") {
      toast.error("Enter Todo", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    dispatch({ type: "ADD_TODOS", payload: text });
    setText("");
    toast.success("Todo Added Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TODOS", payload: id });
    toast.success("Todo Deleted Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleToggle = (id , isChecked) => {
    dispatch({ type: "TOGGLE_TODOS", payload: id });

    if(!isChecked){
      toast.success("Todo is Done", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleEdit = (id, title) => {
    setEditTodoId(id);
    setEditText(title);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const saveEdit = (id) => {
    dispatch({ type: "EDIT_TODO", payload: { id, title: editText } });
    setEditTodoId(null);
    setEditText("");
    toast.success("Todo Edited Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleReminder = (id) => {
    setModal(true);
    setReminderId(id);
  };

  return (
    <div className="p-10 bg-blue-950 h-screen flex justify-center ">
      <div>
        <h1 className="text-3xl font-bold text-white py-6 text-center tracking-wide">
          Manage Your Todos
        </h1>
        <div className="flex justify-center items-center">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add todo...."
            className=" rounded-l-lg py-2 px-2 text-xl focus:outline-none focus:border-transparent w-60 sm:w-[500px] lg:w-[600px] 2xl:w-[500px]"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 rounded-r-lg bg-green-600 text-white font-semibold text-xl"
          >
            Add
          </button>
        </div>
        {filtredState.length > 0 && (
          <div className="flex my-6 justify-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-[400px] 2xl:w-[400px]"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        )}
        <div className="flex flex-col justify-center items-center">
          {filtredState
            .filter((todo) =>
              todo.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((todo) => (
              <div
                key={todo.id}
                className={`
              flex py-2 px-3 cursor-pointer my-3 rounded-lg text-black font-semibold justify-between items-center bg-pink-100 w-60
              sm:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[500px]
              ${todo.isChecked ? "bg-green-300" : ""}
              `}
              >
                <div className="flex justify-center items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => handleToggle(todo.id , todo.isChecked)}
                    checked={todo.isChecked}
                  />
                  {editTodoId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={handleEditChange}
                      className="px-2 py-1"
                    />
                  ) : (
                    <div>
                      <h1
                        className={`${
                          todo.isChecked ? "line-through" : ""
                        } flex flex-col`}
                      >
                        {todo.title}
                      </h1>
                      <span className="text-sm">
                        {todo?.time} {todo?.date}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  {todo.isChecked ? null : (
                    <>
                      {editTodoId === todo.id ? (
                        <button
                          className="px-2 py-1 bg-white rounded-lg mx-3"
                          onClick={() => saveEdit(todo.id)}
                        >
                          ✅
                        </button>
                      ) : (
                        <button
                          className="px-2 py-1 bg-white rounded-lg mx-3"
                          onClick={() => handleEdit(todo.id, todo.title)}
                        >
                          ✏
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="px-2 py-1 bg-white rounded-lg"
                  >
                    ❌
                  </button>
                  <button
                    onClick={() => handleReminder(todo.id)}
                    className="px-2 py-1 mx-3 bg-white rounded-lg"
                  >
                    Set Reminder
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {modal && <Modal setModal={setModal} reminderId={reminderId} />}
    </div>
  );
}

export default Todos;
