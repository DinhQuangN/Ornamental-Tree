import { postAPI } from '@/utils/axios'
import { Button, Input, notification } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ForgotPassword = () => {
  const { t: common } = useTranslation('common', { keyPrefix: 'common.common' })
  const { t } = useTranslation('common', { keyPrefix: 'common.login' })
  const [email, setEmail] = useState<string>('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleForgotPassword = async () => {
    const res = await postAPI('forgotPassword', { account: email })
    notification.success({ message: res.data.message })
  }
  return (
    <section id="navbars" style={{ backgroundColor: '#fff', height: '30vh' }}>
      <div
        className="navbar container"
        style={{
          marginTop: '30px',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <span
            style={{ fontSize: '24px', marginRight: '15px', width: '200px' }}
          >
            {common('account')}
          </span>
          <Input value={email} name="email" onChange={handleChange} />
        </div>
        <Button onClick={handleForgotPassword} type="primary">
          {t('forgotPassword')}
        </Button>
      </div>
    </section>
  )
}

export default ForgotPassword
