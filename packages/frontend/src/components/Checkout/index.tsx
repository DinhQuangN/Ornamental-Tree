import { useAppSelector } from '@/hook/useTypedSelector'
import { postAPI } from '@/utils/axios'
import { vnd } from '@/utils/utils'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button, Input, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MapBox from '../MapBox'

const CARD_OPTIONS = {
  style: {
    base: {
      color: '#000',
      fontSize: '20px',
      iconColor: '#000',
      '::placeholder': {
        color: '#000',
      },
    },
    invalid: {
      iconColor: '#ff0505',
      color: '#ff0505',
    },
    complete: {
      iconColor: '#000',
    },
  },
}

interface ICheckOut {
  name: string
  address: string
  email: string
  describe: string
}
interface IProps {
  setOpen: (value: boolean) => void
  totalMoney: number
}
const CheckOut: React.FC<IProps> = ({ setOpen, totalMoney }) => {
  const { t } = useTranslation('common', { keyPrefix: 'common.checkout' })
  const [openMap, setOpenMap] = useState<boolean>(false)
  const initialState = {
    describe: '',
    name: '',
    address: '',
    email: '',
  }
  const [stripeToken, setStripeToken] = React.useState<string | undefined>()
  const [data, setData] = React.useState<ICheckOut>(initialState)
  const { auth, cart } = useAppSelector((state) => state)
  const { name, describe, address, email } = data
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const stripe = useStripe()
  const elements = useElements()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (elements == null) return
    if (stripe == null) return
    const cardElement = elements.getElement(CardElement)
    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })
      if (!error) {
        try {
          const { id } = paymentMethod
          setStripeToken(id)
        } catch (error: any) {
          notification.error(error)
        }
      } else {
        notification.error({ message: error.message })
      }
    }
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await postAPI('payment', {
          tokenId: stripeToken,
          totalMoney: totalMoney,
          describe,
          name,
        })
      } catch (error: any) {
        notification.error({ message: error.message })
      }
    }
    stripeToken && makeRequest()
    setStripeToken('')
    setOpen(false)
  }, [stripeToken, totalMoney])
  useEffect(() => {
    stripeToken &&
      setTimeout(async () => {
        await postAPI(
          'createOrder',
          {
            name,
            products: cart,
            describe,
            totalMoney,
            address,
            email,
          },
          auth.data?.access_token
        )
        window.location.href = '/success'
      }, 2500)
  }, [stripeToken])
  return (
    <form className="check_out-form" onSubmit={handleSubmit}>
      <fieldset className="check_out-form-group">
        <div className="check_out-form-row">
          <label htmlFor="check_out-form-label">{t('pay')}</label>
          <i className="fas fa-times" onClick={() => setOpen(false)}></i>
        </div>
        <CardElement options={CARD_OPTIONS} />
        <div className="check_out-form-column">
          <Input
            type="text"
            placeholder={t('fullName')}
            name="name"
            value={name}
            onChange={handleOnChange}
            style={{ marginBottom: '10px' }}
          />
          <Input
            type="text"
            placeholder={t('phone')}
            name="email"
            value={email}
            onChange={handleOnChange}
            style={{ marginBottom: '10px' }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              gap: '10px',
            }}
          >
            <Input
              type="text"
              placeholder={t('address')}
              name="address"
              value={address}
              onChange={handleOnChange}
            />
            <Button style={{ width: '30%' }} onClick={() => setOpenMap(true)}>
              {t('chooseAddress')}
            </Button>
          </div>
          {openMap && (
            <div style={{ marginBottom: '10px' }}>
              <MapBox
                height="20vh"
                sizeInput="middle"
                onSearch={(value) => setData({ ...data, address: value })}
              />
            </div>
          )}
          <Input
            type="text"
            placeholder={t('describe')}
            name="describe"
            value={describe}
            onChange={handleOnChange}
            style={{ marginBottom: '10px' }}
          />
        </div>
      </fieldset>
      <button type="submit" disabled={!stripe || !elements}>
        Pay {vnd(totalMoney)} đ
      </button>
    </form>
  )
}

export default CheckOut
