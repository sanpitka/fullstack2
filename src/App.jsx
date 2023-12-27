import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const api_key = import.meta.env.VITE_WEATHER_KEY

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
          <h2>Weather in {country.capital}</h2>
          <Weather capitalInfo={country.capitalInfo}/> 
        </div>
        )}
      </div>
    )
  }
  return(
    <div>{countryList.map(country => 
      <div key={country.name.official}>
        {country.name.common}
        <button onClick={() => props.showOneCountry(country.name.common)}>Show</button>
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

const Weather = (props) => {

  const [weather, setWeather] = useState([])
  
  const lat = props.capitalInfo.latlng[0]
  const lon = props.capitalInfo.latlng[1]
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  
  if (weather.length != 0) return(
  <div key = {props.name}>
    temperature {weather.main.temp} Celsius <br />
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/> <br />
    wind {weather.wind.speed} m/s
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

  const showOneCountry = (name) => {
    setFilter(name)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChanges={handleFilterChanges}/>
      <Countries countries={countries} filter={filter} showOneCountry={showOneCountry}/>
    </div>
  )
}

export default App
