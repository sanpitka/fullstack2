const Header = (props) => {
    return (
      <div>
        <h3>
          {props.course}
        </h3>
      </div>
    )
  }

const Content = (props) => {
    return(
      <div>
        {props.parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
          )}         
      </div> 
    )
}

const Total = (props) => {
    const exercises = props.parts.map(part => part.exercises)
    const initialValue = 0
    const total = exercises.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
    return(
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}

const Course = ({course}) => {

    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course