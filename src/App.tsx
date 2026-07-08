import { PrefectureProvider } from './components/PrefectureProvider'
import { PrefectureLanding } from './pages/PrefectureLanding'

function App() {
  return (
    <PrefectureProvider>
      <PrefectureLanding />
    </PrefectureProvider>
  )
}

export default App
