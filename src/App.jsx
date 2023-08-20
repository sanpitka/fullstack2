import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    //Checks if the name is already in the phonebook
    const names = persons.map(persons => persons.name)
    names.includes(newName) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(personObject))
    console.log(persons)
    setNewName('')
    setNewNumber('')
  }

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
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChanges}
          />
        </div>
        <div>number: <input  
            value={newNumber}
            onChange={handleNumberChanges}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App