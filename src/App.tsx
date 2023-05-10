import Header from '@/components/Header/Header'
import HeaderBottom from '@/components/Header/HeaderBottom'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Header />
      <HeaderBottom />
    </Router>
  )
}

export default App
