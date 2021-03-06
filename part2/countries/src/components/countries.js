import React from 'react';
import Weather from './weather.js'

const Countries = ( {filteredList, handleClick} ) => {

  const handleLength = () => {
    if (filteredList.length > 10) {
      return <p>Too many matches, please narrow your query!</p>
    }
    else  if (filteredList.length <=10 && filteredList.length !== 1){
      return filteredList.map( country => <div key={country.numericCode}>{country.name}<button onClick={handleClick} id={country.name}>show</button></div>)
    }
    else
      return filteredList.map( country =>
        <div key={country.numericCode}>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h3>Languages: </h3>
          <ul>
            {country.languages.map( language => <li key={language.iso639_1}>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt={country.name + " flag"} style={{maxWidth: '100px'}}/>

          <Weather capital={country.capital}/>
        </div>
      )
  }

  return(
    <div className="countries">
      {handleLength()}
    </div>
  )
}

export default Countries
