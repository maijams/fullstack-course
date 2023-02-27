const Header = ({ header }) => {
  console.log(header)
  return (
    <h1>{header}</h1>
  )
}
  
const Part = ({ part }) => {
  console.log(part)
  return (
    <p>{part.name} {part.exercises}</p>
  )
}
  
const Content = ({ parts }) => {
  console.log(parts)
  const t = []
  parts.map(part => t.push(part.exercises)) 
  const total = t.reduce((s, p) => s + p)
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
      <b>total of {total} exercises</b>
    </div> 
  )
}
  
const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}


export default Course