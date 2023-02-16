import React from 'react'

const NavBar = ({ showNewTodo, setShowNewTodo }) => {
  return (
    <div>
      <button onClick={() => { setShowNewTodo(!showNewTodo); console.log(showNewTodo) }}>New Todo</button>
    </div>
  )
}

export default NavBar
