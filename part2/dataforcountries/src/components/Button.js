import React from "react"

const Button = ({country, setNewFilter }) => {

    const handleClick = () => {
        setNewFilter(country.name.common)
    }

    return (
        <button onClick={handleClick}>
            show
        </button>
    )
}

export default Button