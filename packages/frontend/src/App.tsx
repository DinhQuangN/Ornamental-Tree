import Admin from '@/admin'
import Accessory from '@/admin/components/Accessory'
import Header from '@/components/Header/Header'
import HeaderBottom from '@/components/Header/HeaderBottom'
import Login from '@/components/Login'
import Navbar from '@/components/Navbar'
import Register from '@/components/Register'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Header />
      <HeaderBottom />
      <Navbar />
      <Routes>
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ki" element={<Register />} />
        <Route path="/admin">
          <Route path="" index element={<Admin />} />
          <Route path="phu-kien-san-pham" element={<Accessory />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
