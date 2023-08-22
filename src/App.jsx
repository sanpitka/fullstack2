import { useState } from 'react'

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
    //Checks if the name is already in the phonebook
    const names = props.persons.map(persons => persons.name)
    names.includes(props.newName) 
      ? alert(`${props.newName} is already added to phonebook`) 
      : props.setPersons(props.persons.concat(personObject))
    props.setNewName('')
    props.setNewNumber('')
  }

  return(
  <form onSubmit={addName}>
    <tr>
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
    </tr>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = (props) => {
  function checkString(person) {
    return person.name.toLowerCase().includes(props.filter.toLowerCase())
  }

  const personsList = props.persons.filter(checkString)
  return(
    <div>{personsList.map(person => 
      <div key={person.name}>
        {person.name} {person.number}
      </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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