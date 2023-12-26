import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const Countries = (props) => {
  
  function checkString(country) {
    return country.name.common.toLowerCase().includes(props.filter.toLowerCase())
  }

  const countryList = props.countries.filter(checkString)

  if (props.filter.length < 1) {
    return null
  }
  else if (countryList.length > 10) {
    return <div>
      Too many matches, specify another filter
    </div>
  }
  else if (countryList.length === 1) {

    const languages = Object.values(countryList[0].languages)
    return(
      <div>{countryList.map(country => 
        <div key={country.name.official}>
          <h2>{country.name.common}</h2>
          capital {country.capital} <br />
          area {country.area} <br />
          <h4>languages:</h4>
          <ul>
            {languages.map(language =>
              <li key={language}>{language}</li>
              )}
          </ul>
          <img src={country.flags.png} width="150px" border="1px" />
        </div>
        )}
      </div>
    )
  }
  return(
    <div>{countryList.map(country => 
      <div key={country.name.official}>
        {country.name.common}
      </div>
      )}
    </div>
  )
}

const Filter = (props) => {
  return(
    <div>
      find countries <input 
        value={props.filter}
        onInput={props.handleFilterChanges}
      />
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (countries)
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChanges = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChanges={handleFilterChanges}/>
      <Countries countries={countries} filter={filter}/>
    </div>
  )
}

export default App
