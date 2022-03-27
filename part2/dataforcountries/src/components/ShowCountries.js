import React from "react"
import Country from './Country'

const ShowCountries = ({ countries, newFilter, setNewFilter }) => {

  const showCountries = countries.filter(c => ((c.name.common.toLowerCase()).includes(newFilter.toLowerCase())))

  return (
    <div>
      {showCountries.map(
        c => <div key={c.name.common}>
          <Country country={c} key={c.name.common} showOneCountry={showCountries.length === 1} setNewFilter={setNewFilter} />
        </div>)}
    </div>
  )
}

export default ShowCountries