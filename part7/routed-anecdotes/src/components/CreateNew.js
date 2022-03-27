import { React } from "react"
import { useHistory } from 'react-router-dom'
import { useField } from "../hooks"


const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const history = useHistory()

  const removeProperty = (obj, propertyName) => {
    const newObj = {...obj}
    delete newObj[propertyName]
    return newObj
  }

  const contentForm = removeProperty(content, 'clear')
  const authorForm = removeProperty(author, 'clear')
  const infoForm = removeProperty(info, 'clear')

  const handleSubmit = (e) => {
    e.preventDefault()
    const contentValue = content.value
    const authorValue = author.value
    const infoValue = info.value
    props.addNew({
      content: contentValue,
      author: authorValue,
      info: infoValue,
      votes: 0
    })
    history.push('/')
    props.setNotification(`${contentValue}`)
    setTimeout(() => {
      props.setNotification(null)
    }, 10000)
  }

  const clearFields = () => {
    content.clear()
    author.clear()
    info.clear()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentForm} />
        </div>
        <div>
          author
          <input {...authorForm} />
        </div>
        <div>
          url for more info
          <input {...infoForm} />
        </div>
        <button type='submit'>create</button> <button type='button' onClick={() => clearFields()}>clear</button>
      </form>
      
    </div>
  )
}

export default CreateNew