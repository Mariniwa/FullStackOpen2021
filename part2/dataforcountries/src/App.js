import React, { useEffect, useState } from "react"
import axios from 'axios'
import SearchFilter from "./components/SearchFilter"

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
    <SearchFilter newFilter={newFilter} setNewFilter={setNewFilter} countries={countries} />
    </div>
  )
}

export default App
