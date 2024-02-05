import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

interface Diary {
  id: number;
  date: string;
  visibility: string;
  weather: string;
}

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data);
    })
  }, [])

  const addNewEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    axios.post('http://localhost:3000/api/diaries', {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }).then(response => {
      setDiaries(diaries.concat(response.data))
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
    })
  }

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={addNewEntry}>
        date
        <input
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        visibility
        <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <br />
        weather
        <input
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
        <br />
        comment
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br />
        <button type='submit'>add</button>
      </form>


      <h2>Diary entries</h2>
      {diaries.map((diary) =>
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          visibility: {diary.visibility}
          <br />
          weather: {diary.weather}
        </div>
      )}
    </>
  )
}

export default App
