import React, { useState } from 'react'
import NewTodo from './NewTodo'


const NavBar = ({ dispatch }) => {

  const [showNewTodo, setShowNewTodo] = useState(false)

  return (
    <>
      <div className="navbar">
        <NewTodo dispatch={dispatch} showNewTodo={showNewTodo} setShowNewTodo={setShowNewTodo} />
        <div className="navbar-bottom">
          <button
            className='new-todo-button'
            onClick={() => setShowNewTodo(!showNewTodo)}>
            {!showNewTodo ? 'New Todo' : 'Close'}
          </button>
        </div>
      </div>
    </>
  )
}

export default NavBar
