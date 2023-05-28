import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Success: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'common.success' })
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '35px',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ fontSize: '32px', lineHeight: '1.5', fontWeight: '500' }}>
        {t('paymentSuccess')}
      </h2>
      <Link
        to="/"
        style={{
          padding: '12px 25px',
          fontSize: '20px',
          background: 'green',
          color: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 8px 0 rgba(0,0,0,0.3)',
          marginTop: '5px',
          lineHeight: '1.5',
          letterSpacing: '0.3px',
        }}
      >
        {t('continueProduct')}
      </Link>
    </div>
  )
}

export default Success
