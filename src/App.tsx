import Header from '@/components/Header/Header'
import HeaderBottom from '@/components/Header/HeaderBottom'
import Navbar from '@/components/Navbar/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Header />
      <HeaderBottom />
      <Navbar />
    </Router>
  )
}

export default App
