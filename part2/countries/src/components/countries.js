import React from 'react';

const Countries = ( {filteredList} ) => {

  const handleLength = () => {
    if (filteredList.length > 10) {
      return <p>Too many matches, please narrow your query!</p>
    }
    else  if (filteredList.length <=10 && filteredList.length !== 1){
      return filteredList.map( country => <p key={country.numericCode}>{country.name}</p>)
    }
    else
      return filteredList.map( country =>
        <div key={country.numericCode}>
          <h2>{country.name}</h2>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <h3>languages: </h3>
          <ul>
            {country.languages.map( language => <li key={language}>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt={country.name + " flag"} style={{maxWidth: '100px'}}/>
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
