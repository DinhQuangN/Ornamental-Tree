import { useAppSelector } from '@/hook/useTypedSelector'
import { getAPI } from '@/utils/axios'
import { useMutation } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Header = () => {
  const { t } = useTranslation('common', { keyPrefix: 'common.header' })
  const { auth, cart } = useAppSelector((state) => state)
  const [open, setOpen] = useState<boolean>(false)

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async (token: string) => await getAPI('logout', token),
    onSuccess() {
      window.location.href = '/'
    },
  })

  const handleLogout = () => {
    auth.data?.access_token && mutate(auth.data?.access_token)
  }

  return (
    <section id="top-headers">
      <div className="top-header container-header">
        <div className="hotline">
          <Link to="#">
            <i className="fas fa-phone-alt"></i>
            {t('hotline')}: <span>0384589790</span>
          </Link>
        </div>

        {auth.data?.user ? (
          <div className="user">
            <div onClick={() => setOpen(!open)}>
              <img src={auth.data.user.avatar} alt={auth.data.user.name} />
              <span>{auth.data.user.name}</span>
            </div>
            <ul className={clsx(open ? 'block' : 'hidden')}>
              <li>
                <Link to="/profile" state={auth} onClick={() => setOpen(!open)}>
                  <i className="fas fa-sign-in-alt"></i>
                  {t('accountInformation')}
                </Link>
              </li>
              {auth.data.user.role === 'admin' && (
                <li>
                  <Link to="/admin" state={auth} onClick={() => setOpen(!open)}>
                    <i className="fas fa-sign-in-alt"></i>
                    {t('adminPage')}
                  </Link>
                </li>
              )}
              <li>
                <Link to="/history">
                  <i className="fas fa-sign-out-alt"></i>
                  {t('purchaseHistory')}
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  {t('logout')}
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="login">
            <Link to="/dang-nhap">
              <i className="fas fa-unlock-alt"></i>
              {t('login')}
            </Link>

            <Link to="/dang-ki">
              <i className="fas fa-user-plus"></i>
              {t('register')}
            </Link>
          </div>
        )}
        <div className="cart">
          <Link to="/gio-hang">
            <i className="fas fa-shopping-cart"></i>
            {t('cart')} {cart.length}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Header
