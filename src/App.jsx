import { useState } from 'react'

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
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons}) => {
  return(
    <div>{persons.map(person => 
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

  const handleNameChanges = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChanges = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

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
      <Persons persons={persons} />
    </div>
  )
}

export default App