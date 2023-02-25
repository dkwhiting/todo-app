import React from 'react'
import Todo from './Todo'

const Todos = ({ todos, dispatch }) => {
  return (
    <div className="todos-list">
      {
        todos.map(todo => {
          return (
            <Todo todo={todo} dispatch={dispatch} key={todo.id} />
          )
        })
      }
    </div>
  )
}

export default Todos
