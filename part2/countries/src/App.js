import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital} <br/>
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
      temperature -- Celcius
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('fetch data')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('RESPONSE', response)
        setData(response.data)
        const t = []
        response.data.map(country => t.push(country.name.common))
        setCountries(t)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const searchResult = filter === ''
  ? []
  : countries.filter(country => country.toLowerCase().includes(filter.toLowerCase()))

  const countriesToShow = searchResult.length > 10
  ? ['Too many matches, specify another filter']
  : searchResult

  if (searchResult.length === 1) {
    const country = data.find(country => country.name.common === searchResult[0])
    console.log(country)
    return (
      <div>
        <form>
          find countries<input filter={filter} onChange={handleFilterChange} />
        </form>
        <Country country={country} />
      </div>
    )
  } else {
    return (
      <div>
        <form>
          find countries<input filter={filter} onChange={handleFilterChange} />
        </form>
        {countriesToShow.map(country => 
          <div key={country}>
            {country} <br/>
          </div>
        )}
      </div>
    )
  }
}


export default App
