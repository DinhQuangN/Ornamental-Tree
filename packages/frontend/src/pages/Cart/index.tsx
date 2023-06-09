import CheckOut from '@/components/Checkout'
import { ICartType, deleteCart, updateQuantityCart } from '@/features/Cart'
import { useAppDispatch, useAppSelector } from '@/hook/useTypedSelector'
import getStripe from '@/utils/getStripe'
import { vnd } from '@/utils/utils'
import { Elements } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Cart: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'common.cart' })
  const [open, setOpen] = useState<boolean>(false)
  const { cart, auth } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  let total: number = 0
  const showTotal = (cart: ICartType[]) => {
    cart.forEach((e) => {
      total += Number(e.price) * e.quantity
    })
    return total
  }
  const handleQuantityDec = (id: string, quantity: number) => {
    quantity >= 1 && dispatch(updateQuantityCart({ id, quantity }))
  }
  const handleQuantityInc = (id: string, quantity: number) => {
    dispatch(updateQuantityCart({ id, quantity }))
  }
  const handleDelete = (id: string) => {
    dispatch(deleteCart({ id }))
  }
  return (
    <div className="productCarts">
      <title>Giỏ hàng</title>
      <div className="productCart">
        <h3>{t('cart')} </h3>
        {cart.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('image')}</th>
                  <th>{t('productName')}</th>
                  <th>{t('productPrice')}</th>
                  <th>{t('quantity')}</th>
                  <th>{t('intoMoney')}</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item: ICartType, index: number) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>
                      <img
                        src={item.imageArray[0].image}
                        alt={item.title.slice(0, 25) + '...'}
                      />
                    </td>
                    <td>{item.title.slice(0, 25) + '...'}</td>
                    <td>{vnd(item.price)} đ</td>
                    <td>
                      <div className="quantity">
                        <button
                          onClick={() =>
                            handleQuantityDec(item._id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input value={item.quantity} disabled />
                        <button
                          onClick={() =>
                            handleQuantityInc(item._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500, letterSpacing: '0.8px' }}>
                      {vnd(item.quantity * Number(item.price))} đ
                    </td>
                    <td>
                      <button
                        style={{ border: 'none' }}
                        onClick={() => handleDelete(item._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '30px', borderBottom: '1px solid #eee' }}>
              <p
                style={{
                  textAlign: 'right',
                  fontSize: '2.3rem',
                  color: 'red',
                  fontWeight: 500,
                  opacity: '0.7',
                  letterSpacing: '0.8px',
                  lineHeight: '1.2',
                }}
              >
                {t('total')}: {vnd(showTotal(cart))} đ
              </p>
            </div>
            <div
              className="button"
              style={{ marginTop: '30px', marginBottom: '15px' }}
            >
              <div
                className="check_out"
                style={open ? {} : { display: 'none' }}
              >
                <Elements stripe={getStripe()}>
                  <CheckOut setOpen={setOpen} totalMoney={total} />
                </Elements>
              </div>
              {auth.data?.user ? (
                <button
                  style={{
                    backgroundColor: '#ff8000',
                    padding: '15px 20px',
                    border: 'none',
                    fontSize: '1.8rem',
                    lineHeight: '1.2',
                    letterSpacing: '0.8px',
                    boxShadow: '0 0 15px 0 rgba(0,0,0,0.2)',
                    marginTop: '15px',
                    borderRadius: '10px',
                    color: '#fff',
                    fontWeight: 500,
                    marginRight: '30px',
                  }}
                  onClick={() => setOpen(!open)}
                >
                  {t('pay')}
                </button>
              ) : (
                <Link
                  to="/dang-nhap"
                  style={{
                    backgroundColor: '#ff8000',
                    padding: '15px 20px',
                    border: 'none',
                    fontSize: '1.8rem',
                    lineHeight: '1.2',
                    letterSpacing: '0.8px',
                    boxShadow: '0 0 15px 0 rgba(0,0,0,0.2)',
                    marginTop: '15px',
                    borderRadius: '10px',
                    color: '#fff',
                    fontWeight: 500,
                    marginRight: '30px',
                  }}
                >
                  {t('login')}
                </Link>
              )}
              <Link
                to="/"
                style={{
                  backgroundColor: '#ff8000',
                  padding: '15px 20px',
                  border: 'none',
                  fontSize: '1.8rem',
                  lineHeight: '1.2',
                  letterSpacing: '0.8px',
                  boxShadow: '0 0 15px 0 rgba(0,0,0,0.2)',
                  marginTop: '15px',
                  borderRadius: '10px',
                  color: '#fff',
                  fontWeight: 500,
                  marginRight: '30px',
                }}
              >
                {t('chooseMoreProduct')}
              </Link>
            </div>
          </>
        ) : (
          <div>
            <p
              style={{
                fontSize: '1.8rem',
                lineHeight: '1.5',
                letterSpacing: '0.8px',
                marginTop: '15px',
              }}
            >
              {t('noProductInCart')}
            </p>
            <p
              style={{
                fontSize: '1.8rem',
                lineHeight: '1.5',
                letterSpacing: '0.8px',
              }}
            >
              {t('please')}
              <Link to="/" style={{ fontWeight: 700 }}>
                {t('chooseProduct')}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
