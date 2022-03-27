import React from 'react'

const Anecdote = ({ anecdote }) => {
  if (anecdote) {
    return (
      <div>
        <h1>{anecdote.content}</h1>
        <div>has {anecdote.votes} votes</div>
        <br></br>
        <div>for more info see <a href={`${anecdote.info}`} >{anecdote.info}</a></div>
        <br></br>
      </div>
    )
  } else return null
}

export default Anecdote
