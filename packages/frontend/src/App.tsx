import Admin from '@/admin'
import Accessory from '@/admin/components/Accessory'
import Category from '@/admin/components/Category'
import Product from '@/admin/components/Product'
import Header from '@/components/Header/Header'
import HeaderBottom from '@/components/Header/HeaderBottom'
import Login, { FormData as FormDataLogin } from '@/components/Login'
import Navbar from '@/components/Navbar'
import Register from '@/components/Register'
import { addToken, refreshToken } from '@/features/Auth'
import { useAppDispatch } from '@/hook/useTypedSelector'
import Home from '@/pages/Home'
import { getAPI, postAPI } from '@/utils/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLayoutEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const App = () => {
  const dispatch = useAppDispatch()

  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (request: FormDataLogin) =>
      await postAPI('login', request),
    onSuccess({ data }) {
      dispatch(addToken(data))
    },
  })

  const handleLogin = (value: FormDataLogin) => {
    mutate(value)
  }
  const category = useQuery({
    queryKey: ['fetchCategory'],
    queryFn: async () => await getAPI('get_category'),
  })

  useLayoutEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <Router>
      <Header />
      <HeaderBottom />
      <Navbar category={category} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dang-nhap"
          element={<Login onChange={(value) => handleLogin(value)} />}
        />
        <Route path="/dang-ki" element={<Register />} />
        <Route path="/admin">
          <Route path="" index element={<Admin />} />
          <Route path="phu-kien-san-pham" element={<Accessory />} />
          <Route
            path="loai-san-pham"
            element={<Category category={category} />}
          />
          <Route path="san-pham" element={<Product category={category} />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
