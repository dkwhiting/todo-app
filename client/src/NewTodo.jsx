import React, { useState, useRef } from 'react'
import { ACTIONS } from './App'

export const newTodo = (name, dueDate, details) => {
  return {
    id: Date.now(),
    name: name,
    details: details,
    dueDate: dueDate,
    complete: false
  }
}

const NewTodo = ({ dispatch, showNewTodo }) => {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name, details: details, dueDate: dueDate } })
    setName('')
  }

  return (
    <form style={{ display: showNewTodo ? 'flex' : 'none' }} onSubmit={handleSubmit}>
      <input type="text" value={name} placeholder='Name: Grocery shopping' onChange={e => setName(e.target.value)} />
      <input type="text" value={details} placeholder='Details: i.e. Milk, eggs, butter, sugar' onChange={e => setDetails(e.target.value)} />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default NewTodo
