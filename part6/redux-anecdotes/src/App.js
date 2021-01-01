import React from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => (
  <>
    <h2>Anecdotes</h2>
    <AnecdoteForm />
    <AnecdoteList />
  </>
)

export default App