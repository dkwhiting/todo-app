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

const NewTodo = ({ dispatch, setShowNewTodo, showNewTodo }) => {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('low')



  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name, details: details, dueDate: dueDate } })
    setName('')
    setDetails('')
    setDueDate('')
    setShowNewTodo(false)
  }

  return (
    <div className={`new-todo-overlay ${showNewTodo ? 'show' : ''}`} onClick={() => setShowNewTodo(false)}>
      <div className='new-todo-content' onClick={e => e.stopPropagation()}>
        <div className='new-todo-header'>
          <h3>Create a new todo</h3>
        </div>

        <div className="new-todo-body">
          <form onSubmit={handleSubmit}>
            <input required type="text" value={name} placeholder='Name: Grocery shopping' onChange={e => setName(e.target.value)} />
            <textarea className='details' required rows="6" cols="10" wrap="soft" value={details} placeholder='Details: i.e. Milk, eggs, butter, sugar' onChange={e => setDetails(e.target.value)} />
            <input className="date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            <span>
              Priority:
              <button className="priority-button" type='button' style={{ backgroundColor: priority === 'low' ? 'green' : 'white' }} onClick={() => setPriority('low')}>Low</button>
              <button className="priority-button" type='button' style={{ backgroundColor: priority === 'medium' ? 'yellow' : 'white' }} onClick={() => setPriority('medium')}>Medium</button>
              <button className="priority-button" type='button' style={{ backgroundColor: priority === 'high' ? 'red' : 'white' }} onClick={() => setPriority('high')}>High</button>
              <button type="submit">ADD TO DO</button>
            </span>
          </form>
        </div>
      </div>
    </div >
  )
}

export default NewTodo
