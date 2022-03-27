import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import SearchFilter from './components/SearchFilter'
import ShowAll from './components/ShowAll'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [goodMessage, setGoodMessage] = useState(null)
  const [badMessage, setBadMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(personsReceived => {
        setPersons(personsReceived)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let wasItEqual = 0
    const personObject = {
      name: newName,
      number: newNumber
    }

    for (let i = 0; i < persons.length; i++) {
      if (areTheseObjectsEqual(personObject, persons[i])) {
        wasItEqual = 1
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          setGoodMessage(`Updated ${newName}`)
          personService.replaceNumber(persons[i], personObject)
            .then(personChanged => setPersons(persons.map(p => p.name !== personChanged.name ? p : personChanged)))
            setTimeout(() => {
              setGoodMessage(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
        }
      }
    }

    if (wasItEqual === 0) {
      setGoodMessage(`Added ${newName}`)
      personService.create(personObject)
        .then(personCreated => {
          setPersons(persons.concat(personCreated))
        })
        setTimeout(() => {
          setGoodMessage(null)
        }, 3000)
      setNewName('')
      setNewNumber('')
    }
  }

  const areTheseObjectsEqual = (first, second) => {
    return (first.name === second.name)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification badMessage={badMessage} goodMessage={goodMessage}/>
      <div>
        <SearchFilter newFilter={newFilter} showAll={showAll} setNewFilter={setNewFilter} setShowAll={setShowAll} />
      </div>
      <h2>add a new person</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ShowAll showAll={showAll} persons={persons} newFilter={newFilter} setPersons={setPersons} setBadMessage={setBadMessage} />
    </div>
  )
}

export default App