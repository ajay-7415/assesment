import { createSlice } from '@reduxjs/toolkit'

const localStoragePrefix = 'Todo_List-'
const TodoStoreagePrefix = `${localStoragePrefix}-todos`

const initialState = {
  todos: loadTodos(),
}

const todoSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setTodo: (state, { payload }) => {
      const { newTodo } = payload
      console.log(newTodo, 'payload')
      return { ...state, todos: [...state.todos, newTodo] }
    },

    deleteTodos: (state, { payload }) => {
      const newTodo = state.todos.filter((todo) => todo.id !== payload.id)

      // return { ...state, todos: [...newTodo] }
      state.todos = [...newTodo]
      saveTodos(state)
    },
  },
})

export const { setTodo, deleteTodos } = todoSlice.actions

export default todoSlice.reducer

function loadTodos() {
  const todostring = localStorage.getItem(TodoStoreagePrefix)
  return JSON.parse(todostring) || []
}

function saveTodos(state) {
  localStorage.setItem(TodoStoreagePrefix, JSON.stringify(state.todos))
}
