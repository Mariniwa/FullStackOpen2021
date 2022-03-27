import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const create = (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(anecdoteContent)
    props.notificationChange(`you created the anecdote: ${anecdoteContent}`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  notificationChange
}

const AnecdoteFormConnected = connect(null, mapDispatchToProps)(AnecdoteForm)

export default AnecdoteFormConnected
