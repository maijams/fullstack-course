import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital} <br />
        area {country.area}
      </p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(value =>
          <li key={value}>{value}</li>
        )}
      </ul>
      <img src={country.flags.png} height='150' />
      <h2>Weather in {country.capital}</h2>
      {weather ? (
        <div>
          <p>temperature {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} height='100' />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      ) : (
        'Loading weather data...'
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState(null)
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY

  useEffect(() => {
    console.log('fetch data')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('countries', response)
        setData(response.data)
        const t = []
        response.data.map(country => t.push(country.name.common))
        setCountries(t)
      })
  }, [])

  useEffect(() => {
    if (country !== null) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          console.log("weather", response)
          setWeather(response.data)
        })
        .catch((error) => {
          console.error('Error fetching weather data', error)
        })
    }
  }, [filter])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const searchResult = filter === ''
    ? []
    : countries.filter(country => country.toLowerCase().includes(filter.toLowerCase()))

  const country = searchResult.length === 1
    ? data.find(country => country.name.common === searchResult[0])
    : null

  return (
    <div>
      <form>
        find countries<input filter={filter} onChange={handleFilterChange} />
      </form>
      {country !== null ? (
        <Country country={country} weather={weather} />
      ) : (
        <div>
          {searchResult.length > 10 ? (
            <div>Too many matches, specify another filter</div>
          ) : (
            searchResult.map(country =>
              <div key={country}>
                {country} <button onClick={() => setFilter(country)}>show</button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}


export default App
