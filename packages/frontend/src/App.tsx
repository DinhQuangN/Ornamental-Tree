import AccessoryAdmin from '@/admin/components/Accessory'
import Category from '@/admin/components/Category'
import Order from '@/admin/components/Order'
import Product from '@/admin/components/Product'
import Statistical from '@/admin/components/Statistical'
import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'
import HeaderBottom from '@/components/Header/HeaderBottom'
import Login, { FormData as FormDataLogin } from '@/components/Login'
import MapBox from '@/components/MapBox'
import Navbar from '@/components/Navbar'
import Register from '@/components/Register'
import { addToken, refreshToken } from '@/features/Auth'
import { useAppDispatch } from '@/hook/useTypedSelector'
import Accessory from '@/pages/Accessory'
import Cart from '@/pages/Cart'
import Detail from '@/pages/Detail'
import Home from '@/pages/Home'
import ProductByCategory from '@/pages/ProductByCategory'
import Search from '@/pages/Search'
import Success from '@/pages/Success'
import { getAPI, postAPI } from '@/utils/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLayoutEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const App = () => {
  const [keyword, setKeyword] = useState<string>('')
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
  const product = useQuery({
    queryKey: ['get_product'],
    queryFn: async () => await getAPI('get_product'),
  })

  useLayoutEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])
  return (
    <Router>
      <Header />
      <HeaderBottom onSearch={setKeyword} />
      <Navbar category={category} />
      <Routes>
        <Route
          path="/"
          element={<Home category={category} product={product} />}
        />
        <Route
          path="/dang-nhap"
          element={<Login onChange={(value) => handleLogin(value)} />}
        />
        <Route path="/dang-ki" element={<Register />} />
        <Route path="/san-pham/:id" element={<Detail product={product} />} />
        <Route path="/gio-hang" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/chuyen-muc/:id"
          element={<ProductByCategory category={category} />}
        />
        <Route
          path="/phu-kien-cay-canh"
          element={<Accessory category={category} />}
        />
        <Route
          path="/tim-kiem"
          element={<Search category={category} keyword={keyword} />}
        />
        {/* <Route path="/map" element={<MapBox />} /> */}
        <Route path="/admin">
          <Route path="" index element={<Statistical />} />
          <Route path="phu-kien-san-pham" element={<AccessoryAdmin />} />
          <Route
            path="loai-san-pham"
            element={<Category category={category} />}
          />
          <Route path="san-pham" element={<Product category={category} />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
