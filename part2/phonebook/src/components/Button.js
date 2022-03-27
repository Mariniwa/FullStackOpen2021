import React from "react"
import personService from '../services/persons'

const Button = ({ person, setPersons, persons, setBadMessage }) => {

  const deleteEventHandler = () => {
    if (window.confirm(`Are you sure you want to delete ${person.name} from your phonebook?`)) {
      personService.deletePerson(person)
      .catch(error => {
        setBadMessage(`Information from ${person.name} was already deleted from the server`)
        setTimeout(() => {
          setBadMessage(null)
        }, 3000)
      })
      setPersons(persons.filter(p => person.id !== p.id))
      
    }
  }

  return (
    <button onClick={deleteEventHandler}>
      delete
    </button>
  )
}

export default Button