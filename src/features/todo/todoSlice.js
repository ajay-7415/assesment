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

      return { ...state, todos: [...state.todos, newTodo] }
    },

    deleteTodos: (state, { payload }) => {
      const newTodo = state.todos.filter((todo) => todo.id !== payload.id)

      // return { ...state, todos: [...newTodo] }
      state.todos = [...newTodo]
      saveTodos(state)
    },
    updateComplete: (state, { payload }) => {
      const index = state.todos.findIndex((index) => index.id === payload.id)
      state.todos.splice(index, 1)
      const readOnly = { ...payload }
      readOnly.complete = !readOnly.complete
      state.todos.splice(index, 0, readOnly)
    },
  },
})

export const { setTodo, deleteTodos, updateComplete } = todoSlice.actions

export default todoSlice.reducer

function loadTodos() {
  const todostring = localStorage.getItem(TodoStoreagePrefix)
  return JSON.parse(todostring) || []
}

function saveTodos(state) {
  localStorage.setItem(TodoStoreagePrefix, JSON.stringify(state.todos))
}
