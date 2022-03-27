import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_ID': {
      const anecdoteToVote = state.find(
        (anecdote) => anecdote.id === action.data
      )
      const changedAnecdoteVote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      const newState = state.map((anecdote) =>
        anecdote.id !== action.data ? anecdote : changedAnecdoteVote
      )
      const finalState = newState.sort((a, b) => b.votes - a.votes)
      return finalState
    }
    case 'CREATE': {
      return state.concat(action.data)
    }
    case 'INIT_ANECDOTES': {
      return action.data.sort((a,b) => b.votes-a.votes)
    }
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE_ID',
      data: anecdote.id
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdoteCreated = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: anecdoteCreated
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer
