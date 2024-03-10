import { useState, useEffect } from 'react'
import personService from './services/Persons.jsx'

const Filter = (props) => {
  return(
    <div>
      filter shown with <input 
        value={props.filter}
        onInput={props.handleFilterChanges}
      />
    </div>
  )
}

const Persons = (props) => {
  
  function checkString(person) {
    return person.name.toLowerCase().includes(props.filter.toLowerCase())
  }

  const personList = props.persons.filter(checkString)
  return(
    <div>{personList.map(person => 
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => props.removePerson(person.id, person.name)}>Delete</button>
      </div>
      )}
    </div>
  )
}

const PersonForm = (props) => {

  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input 
          value={props.newName}
          onChange={props.handleNameChanges}
        />
      </div>
      <div>number: <input  
          value={props.newNumber}
          onChange={props.handleNumberChanges}
          />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  console.log(message)
  return (
    <div className="message">
      {message}
    </div>
  )
}

const Alert = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }
  console.log(errorMessage)
  return (
    <div className="errorMessage">
      {errorMessage}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    if (!persons.map(persons => persons.name).includes(newName)){
      personService
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setMessage(
              `Added ${newName}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
    } else if (window.confirm(`${newName} is already added to phonebook.
        Replace the old numer with the new one?`)){

          const existingPerson = persons.find(existingPerson => existingPerson.name === newName)
          const updatedPerson = {...personObject, number: newNumber}
          personService
            .update(existingPerson.id, updatedPerson)
            .then(
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson)),
              setMessage(
                `Updated ${newName}`
              ),
              setTimeout(() => {
                setMessage(null)
              }, 3000))
            .catch(error => {
              setMessage(null)
              setErrorMessage(
                `Information of ${newName} has already been removed from server`
              ),
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
              setPersons(persons.filter((person) => person.name !== newName))
            })
            
      }
      
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(
        setPersons(persons.filter((person) => person.id !== id)),
        setMessage(
          `${name} deleted`
        ),
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        )
      .catch(error => {
        setMessage(null)
        setErrorMessage(
          `Information of ${name} has already been removed from server`
        ),
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  const handleNameChanges = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChanges = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChanges = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <Alert errorMessage={errorMessage}/>
      <Filter filter={filter} handleFilterChanges={handleFilterChanges}/>
      
      <h3>Add contact</h3>
      <PersonForm 
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChanges={handleNameChanges}
        handleNumberChanges={handleNumberChanges}
        />
      
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        filter={filter}
        removePerson={removePerson}/>
    </div>
  )
}

export default App