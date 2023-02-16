import { useReducer, useState } from 'react'
import Todo from './Todo'
import NewTodo, { newTodo } from './NewTodo'
import NavBar from './NavBar'
import './App.css'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
}

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos
  }
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [showNewTodo, setShowNewTodo] = useState(false)

  return (
    <div className="App">
      <NavBar showNewTodo={showNewTodo} setShowNewTodo={setShowNewTodo} />
      <div className="new-todo" style={{ width: showNewTodo ? '100%' : '0' }}>
        <NewTodo showNewTodo={showNewTodo} setShowNewTodo={setShowNewTodo} dispatch={dispatch} />
      </div>
      {todos.map(todo => {
        return (
          <Todo todo={todo} dispatch={dispatch} key={todo.id} />
        )
      })}

    </div>
  )
}