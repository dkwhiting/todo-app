import { useReducer, useState } from 'react'
import Todo from './Todo'
import Todos from './Todos'
import NewTodo, { newTodo } from './NewTodo'
import NavBar from './NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import './App.css'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
}

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name, action.payload.dueDate, action.payload.details)]
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
      <NavBar dispatch={dispatch} />
      <Todos dispatch={dispatch} todos={todos} />
      <NewTodo dispatch={dispatch} showNewTodo={showNewTodo} setShowNewTodo={setShowNewTodo} />
      <FontAwesomeIcon
        icon={faCirclePlus}
        className="new-todo-button"
        onClick={() => setShowNewTodo(true)}
      />
    </div >
  )
}