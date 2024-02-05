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

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data);
    })
  }, [])

  return (
    <>
      <h2>Diary entries</h2>
        {diaries.map((diary) => 
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            visibility: {diary.visibility}
            <br/>
            weather: {diary.weather}
          </div>
        )}
    </>
  )
}

export default App
