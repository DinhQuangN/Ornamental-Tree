import NotFound from '@/components/NotFound'
import { useAppSelector } from '@/hook/useTypedSelector'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface AdminProps {
  dash?: string
  product?: string
  slide?: string
  order?: string
  category?: string
  accessory?: string
  user?: string
  children?: React.ReactNode
}

const Admin = ({
  dash,
  product,
  slide,
  order,
  category,
  accessory,
  user,
  children,
}: AdminProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'common.admin' })
  const { auth } = useAppSelector((state) => state)
  
  return (
    <div className="admin">
      <title>Admin {t('statistical')}</title>
      {auth.data?.user?.role === 'admin' ? (
        <div className="adminContainer">
          <div className="adminNav">
            <div className="admin-left">
              <ul>
                <li className={dash}>
                  <Link to="/admin">{t('statistical')}</Link>
                </li>
                <li className={product}>
                  <Link to="/admin/san-pham">{t('product')}</Link>
                </li>
                <li className={slide}>
                  <Link to="/admin/slider">{t('slider')}</Link>
                </li>
                <li className={order}>
                  <Link to="/admin/order">{t('bill')}</Link>
                </li>
                <li className={category}>
                  <Link to="/admin/loai-san-pham">{t('productType')}</Link>
                </li>
                <li className={accessory}>
                  <Link to="/admin/phu-kien-san-pham">{t('accessory')}</Link>
                </li>
                <li className={user}>
                  <Link to="/admin/tai-khoan">{t('account')}</Link>
                </li>
              </ul>
            </div>
            <div className="admin-right">{children}</div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default Admin
