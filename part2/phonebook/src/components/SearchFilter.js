import React from 'react'

const SearchFilter = ({ newFilter, showAll, setNewFilter, setShowAll }) => {

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
        if (newFilter !== null) {
            setShowAll(false)
        }
    }
    return (
        <div>
            filter shown with <input value={newFilter} onChange={handleFilterChange} />
        </div>
    )
}

export default SearchFilter