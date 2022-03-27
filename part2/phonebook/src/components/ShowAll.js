import React from "react"
import Person from './Person'
import Button from './Button'

const ShowAll = ({ showAll, persons, newFilter, setPersons, setBadMessage }) => {

    const personsToShow = showAll
        ? persons
        : persons.filter(p => (p.name.toLowerCase()).includes(newFilter.toLowerCase()))

    if (!persons) return null
    else return personsToShow.map(p => <div key={p.id}>
        <Person person={p} /> <Button person={p} setPersons={setPersons} persons={persons} setBadMessage={setBadMessage} />
    </div>)
}

export default ShowAll