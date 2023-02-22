import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTodo, deleteTodos } from './features/todo/todoSlice'

const localStoragePrefix = 'Todo_List-'
const TodoStoreagePrefix = `${localStoragePrefix}-todos`

function App() {
  const [todoInput, setTodoInput] = React.useState('')
  // const [todos, setTodos] = React.useState(loadTodos())

  const { todos } = useSelector((store) => store.cart)

  const dispatch = useDispatch()

  React.useEffect(() => {}, [])

  const handleSubmit = (event) => {
    console.log('submitte')
    event.preventDefault()
    if (todoInput === '') return
    const newTodo = {
      name: todoInput,
      id: new Date().valueOf().toString(),
    }

    dispatch(setTodo({ newTodo }))
    setTodoInput('')

    saveTodos()
  }

  const handleTodoInput = (e) => {
    const input = e.target.value
    setTodoInput(input)
  }
  function saveTodos() {
    localStorage.setItem(TodoStoreagePrefix, JSON.stringify(todos))
  }

  return (
    <div>
      <ul id='list'>
        {todos?.map((todo) => {
          const { name, id } = todo
          return (
            <li className='list-item'>
              <label className='list-item-label'>
                <span>{name}</span>
              </label>
              <button onClick={() => dispatch(deleteTodos({ id }))}>
                Delete
              </button>
            </li>
          )
        })}
      </ul>
      <form id='new-todo-form' onSubmit={handleSubmit}>
        <label>New Todo</label>
        <input type='text' value={todoInput} onChange={handleTodoInput} />
        <button type='submit'>Add Todo</button>
      </form>
    </div>
  )
}

export default App

export function loadTodos() {
  const todostring = localStorage.getItem(TodoStoreagePrefix)
  return JSON.parse(todostring) || []
}
