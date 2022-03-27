import React, { useState } from 'react'

const Button = ({ eventHandler, text }) => {
  return (
    <button onClick={eventHandler}>
      {text}
    </button>
  )
}

const MaxVoted = ({votes, anecdotes}) => {
  let max = 0
  let i=0
  let selectedIndex=0
  for(i=0;i<votes.length;i++){
    if (max<=votes[i]){
      max=votes[i]
      selectedIndex=i
    }
  }
  return (
    <div>{anecdotes[selectedIndex]}<br/>
    has {max} votes</div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const randomGenerator = () => Math.floor(Math.random() * (anecdotes.length))

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])

  const nextAnecdote = () => {
    setSelected(randomGenerator())
  }

  const voteQuote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <Button eventHandler={voteQuote} text="vote" />
      <Button eventHandler={nextAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <MaxVoted votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
