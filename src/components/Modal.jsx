import PropTypes from "prop-types"
import { useContext } from "react";
import { useState } from "react";
import { TodoContext } from "../State";
import { toast } from "react-toastify";
function Modal({setModal , reminderId}) {
    const {dispatch} = useContext(TodoContext)
    const[email,setEmail] = useState('')
    const[date,setDate] = useState('')
    const[time,setTime] = useState('')

    const handleClick = () => {
        dispatch({type:"ADD_REMINDERS",payload:{email,date,time,reminderId}})
        setModal(false)
        toast.success("Reminder Added Successfully", {
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
  return (
   <div className='relative'>
     <div className="absolute top-28 right-28 bg-gray-200 rounded-lg px-8 py-10 shadow-xl">
        <span className='absolute right-6 top-4 cursor-pointer' onClick={() => setModal(false)}>❌</span>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Enter Email</h1>
        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Enter Date & Time</h1>
        <div className="flex space-x-4">
          <input type="date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          />
          <input type="time" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={time}
          onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={handleClick}
      >
        Done
      </button>
    </div>
   </div>
  );
}

Modal.propTypes = {
    setModal:PropTypes.func,
    reminderId:PropTypes.func
}

export default Modal;
