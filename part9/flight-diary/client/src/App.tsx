import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Diary } from './types'
import { getAllDiaries, createDiary } from './services/diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllDiaries().then(diaries => setDiaries(diaries))
  }, [])

  const addNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const newDiary = await createDiary({ date, visibility, weather, comment })
      setDiaries(diaries.concat(newDiary))
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
      setError(null)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data)
      }
    }
  }

  return (
    <>
      <h2>Add new entry</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={addNewEntry}>
        date
        <input
          type='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        visibility
        &nbsp;
        great
        <input
          type='radio'
          name='visibility'
          checked={visibility === 'great'}
          onChange={() => setVisibility('great')}
        />
        good
        <input
          type='radio'
          name='visibility'
          checked={visibility === 'good'}
          onChange={() => setVisibility('good')}
        />
        ok
        <input
          type='radio'
          name='visibility'
          checked={visibility === 'ok'}
          onChange={() => setVisibility('ok')}
        />
        poor
        <input
          type='radio'
          name='visibility'
          checked={visibility === 'poor'}
          onChange={() => setVisibility('poor')}
        />
        <br />
        weather
        &nbsp;
        sunny
        <input
          type='radio'
          name='weather'
          checked={weather === 'sunny'}
          onChange={() => setWeather('sunny')}
        />
        rainy
        <input
          type='radio'
          name='weather'
          checked={weather === 'rainy'}
          onChange={() => setWeather('rainy')}
        />
        cloudy
        <input
          type='radio'
          name='weather'
          checked={weather === 'cloudy'}
          onChange={() => setWeather('cloudy')}
        />
        stormy
        <input
          type='radio'
          name='weather'
          checked={weather === 'stormy'}
          onChange={() => setWeather('stormy')}
        />
        windy
        <input
          type='radio'
          name='weather'
          checked={weather === 'windy'}
          onChange={() => setWeather('windy')}
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
