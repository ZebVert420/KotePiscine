import './index.css'
import AppRouter from './routes/AppRouter'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  )
}

export default App
