import React from "react" 
import Button from './Button'
import ShowWeather from './ShowWeather'

const Country = ({ country, showOneCountry, setNewFilter }) => {
    
    if (showOneCountry === true) {
        const languageValues = Object.values(country.languages)
        const languageValuesMapped = languageValues.map(l=> <li key={l}>{l}</li>)
        
        return (
            <div>
                <h1>
                    {country.name.common}
                </h1>
                capital: {country.capital}<br />
                population: {country.population}
                <h2>
                    languages
                </h2>
                <ul>
                    {languageValuesMapped}
                </ul>
                <img src={country.flags.png} alt=''/>

                <h2>Weather for {country.capital}</h2>
                <ShowWeather country={country} />
                
            </div>
        )
    }

    else return (
        <div>
            {country.name.common} <Button country={country} setNewFilter={setNewFilter}/>
        </div>
    )
}

export default Country