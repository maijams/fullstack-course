import { useState, useEffect } from 'react'
import personService from './services/personService'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const setMessageAndReset = (message, color, timeout) => {
    setMessage(message)
    setMessageColor(color)
    setTimeout(() => {
      setMessage(null)
    }, timeout)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(o => o.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === newName)
        personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(n => n.id !== person.id ? n : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessageAndReset(`Updated number for ${newName}`, 'green', 3000)
          })
          .catch(error => {
            console.log(error.response.data)
            setMessageAndReset(error.response.data.error, 'red', 3000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessageAndReset(`Added ${newName}`, 'green', 3000)
        })
        .catch(error => {
          console.log(error.response.data)
          setMessageAndReset(error.response.data.error, 'red', 3000)
        })
    }
  }

  const removePerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(n => n.id !== id)))
      setMessageAndReset(`Deleted ${person.name}`, 'green', 3000)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={messageColor} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}


export default App