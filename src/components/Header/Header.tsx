import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Header = () => {
  const { t } = useTranslation('common', { keyPrefix: 'common.header' })

  return (
    <section id="top-headers">
      <div className="top-header container-header">
        <div className="hotline">
          <Link to="#">
            <i className="fas fa-phone-alt"></i>
            {t('hotline')}: <span>0384589790</span>
          </Link>
        </div>

        {/* {auth.data?.user ? (
          <div className="user">
            <div onClick={() => setClickUser(!clickUser)}>
              <img src={auth.data.user.avatar} alt={auth.data.user.name} />
              <p>{auth.data.user.name}</p>
            </div>
            <ul style={clickUser ? { display: 'block' } : { display: 'none' }}>
              <li>
                <Link
                  to="/profile"
                  state={auth}
                  onClick={() => setClickUser(!clickUser)}
                >
                  <i className="fas fa-sign-in-alt"></i>Thông tin tài khoản
                </Link>
              </li>
              {auth.data.user.role === 'admin' && (
                <li>
                  <Link
                    to="/admin"
                    state={auth}
                    onClick={() => setClickUser(!clickUser)}
                  >
                    <i className="fas fa-sign-in-alt"></i>Trang admin
                  </Link>
                </li>
              )}
              <li>
                <Link to="/history">
                  <i className="fas fa-sign-out-alt"></i>Lịch sử mua hàng
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>Đăng xuất
                </Link>
              </li>
            </ul>
          </div>
        ) : ( */}
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
        {/* )} */}
        <div className="cart">
          <Link to="/gio-hang">
            <i className="fas fa-shopping-cart"></i>
            {t('cart')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Header
