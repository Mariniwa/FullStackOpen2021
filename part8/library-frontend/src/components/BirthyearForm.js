import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { SET_BIRTHYEAR, ALL_AUTHORS } from '../queries'

import CustomSelect from './CustomSelect'

const BirthyearForm = () => {
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  const [editBirthyear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    await editBirthyear({ variables: { name, setBornTo } })

    setName('')
    setSetBornTo('')
  }

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <CustomSelect setName={setName}/>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm
