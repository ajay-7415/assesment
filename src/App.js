import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTodo, deleteTodos, updateComplete } from './features/todo/todoSlice'

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
      complete: false,
    }

    dispatch(setTodo({ newTodo }))
    setTodoInput('')

    saveTodos()
  }

  const handleChange = (e) => {
    const parent = e.target.closest('.list-item')
    const id = parent.dataset.todoId
    const todo = todos.find((t) => t.id === id)
    dispatch(updateComplete(todo))
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
            <li className='list-item' data-todo-id={id} key={id}>
              <label className='list-item-label'>
                <input
                  type='checkbox'
                  onChange={handleChange}
                  data-list-item-checkbox
                />

                <span data-list-item-text>{name}</span>
              </label>
              <button
                data-button-delete
                onClick={() => dispatch(deleteTodos({ id }))}
              >
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
