import React from "react"
import ShowCountries from './ShowCountries'

const SearchFilter = ({ newFilter, setNewFilter, countries }) => {

    const showCountries = countries.filter(c => ((c.name.common.toLowerCase()).includes(newFilter.toLowerCase())))

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    if ((showCountries.length > 10)) {
        return (
            <div>
                filter countries with <input value={newFilter} onChange={handleFilterChange} />
                <br />Too many matches, be more specific
            </div>
        )
    }

    if ((showCountries.length > 1) && (showCountries.length < 11)) {
        return (
            <div>
                filter countries with <input value={newFilter} onChange={handleFilterChange} />
                <ShowCountries countries={countries} newFilter={newFilter} setNewFilter={setNewFilter} />
            </div>
        )
    }
    
    if (showCountries.length === 1) {
        return (
            <div>
                filter countries with <input value={newFilter} onChange={handleFilterChange} />
                <ShowCountries countries={countries} newFilter={newFilter} setNewFilter={setNewFilter} />
            </div>
        )
    }

    if (showCountries.length === 0) {
        return (
            <div>
                filter countries with <input value={newFilter} onChange={handleFilterChange} />
                <br />No matches, please specify another filter.
            </div>
        )
    }
}

export default SearchFilter