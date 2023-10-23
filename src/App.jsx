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

const PersonForm = (props) => {

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: props.newName,
      number: props.newNumber
    }
    const names = props.persons.map(persons => persons.name)
    names.includes(props.newName) 
      ? alert(`${props.newName} is already added to phonebook`) 
      : personService
      .create(personObject)
      .then(response => {
        props.setPersons(props.persons.concat(response.data))
      })
    props.setNewName('')
    props.setNewNumber('')    
  }

  return(
  <form onSubmit={addName}>
    <table><tbody><tr>
      <td>name: </td><td><input 
         value={props.newName}
         onChange={props.handleNameChanges}
        />
      </td>
    </tr>
    <tr>
      <td>number: </td><td><input  
        value={props.newNumber}
        onChange={props.handleNumberChanges}
        />
      </td>
    </tr></tbody></table>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
  )
}

const Persons = (props) => {
  function checkString(person) {
    return person.name.toLowerCase().includes(props.filter.toLowerCase())
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(location.reload())
    }
  }

  const personsList = props.persons.filter(checkString)
  return(

    <div>{personsList.map(person => 
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => removePerson(person.id, person.name)}>Delete</button>
      </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChanges={handleFilterChanges}/>
      
      <h3>Add a new</h3>      
      <PersonForm 
        handleNameChanges={handleNameChanges}
        handleNumberChanges={handleNumberChanges}
        newName={newName}
        newNumber={newNumber}
        persons={persons}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App