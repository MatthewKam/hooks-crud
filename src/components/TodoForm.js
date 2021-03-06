import React, { useState, useEffect, useContext } from 'react';
import TodosContext from '../context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function TodoForm() {
  const [todo, setTodo] = useState('');
  const { state: { currentTodo = {} }, dispatch } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text)
    } else {
      setTodo('');
    }
  }, [currentTodo.id])

  const handleSubmit = async event => {
    event.preventDefault();
    if (currentTodo.text) {
      const response = await axios.patch(`https://practice-react-hooks-api.vercel.app/todos/${currentTodo.id}`, {
        text:todo
      })
      dispatch({ type: 'UPDATE_TODO', payload: response.data })
    } else {
      const response = await axios.post('https://practice-react-hooks-api.vercel.app/todos', {
        id: uuidv4(),
        text: todo,
        complete: false
      })
      dispatch({ type: "ADD_TODO", payload: response.data })
    }
    setTodo('');
  }
  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2 px-1"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
      {/* <button type="submit">Add </button> */}
    </form>
  )
}