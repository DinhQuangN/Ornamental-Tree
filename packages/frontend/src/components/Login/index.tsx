import { useAppSelector } from '@/hook/useTypedSelector'
import React, { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

export interface FormData {
  account: string
  password: string
}

interface LoginProps {
  onChange?: (value: FormData) => void
}

const Login = ({ onChange }: LoginProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [data, setData] = useState<FormData>({ account: '', password: '' })
  const { t: common } = useTranslation('common', { keyPrefix: 'common.common' })
  const { t } = useTranslation('common', { keyPrefix: 'common.login' })
  const { auth } = useAppSelector((state) => state)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onChange?.(data)
  }
  useLayoutEffect(() => {
    if (auth.data?.access_token) {
      navigate('/')
    }
    return
  }, [auth.data?.access_token])

  return (
    <div className="limiter">
      <title>{t('login')}</title>
      <div className="container">
        <div className="wrap-login">
          <form className="login-form validate-form" onSubmit={handleSubmit}>
            <span className="login-form-title">{t('login')}</span>
            <div
              className="wrap-input validate-input"
              data-validate="Username is required"
            >
              <span className="label-input">{common('account')}</span>
              <input
                className="input"
                type="text"
                name="account"
                value={data.account}
                onChange={(e) => setData({ ...data, account: e.target.value })}
                placeholder={t('enterYourAccount')}
              />
              <span className="focus-input" data-symbol="&#xf206;"></span>
            </div>
            <div
              className="wrap-input validate-input"
              data-validate="Password is required"
            >
              <span className="label-input">{common('password')}</span>
              <input
                className="input"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder={t('enterYourPassword')}
              />
              <span className="focus-input" data-symbol="&#xf190;"></span>
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <i className="fa fa-eye-slash show" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-eye show" aria-hidden="true"></i>
                )}
              </span>
            </div>
            <div className="text-right">
              <Link to="/quen-mat-khau">{t('forgotPassword')}</Link>
            </div>
            <div className="container-login-form-btn">
              <div className="wrap-login-form-btn">
                <div className="login-form-bgbtn"></div>
                <button className="login-form-btn" type="submit">
                  {t('login')}
                </button>
              </div>
            </div>
            <div className="txt1">
              <span>{t('orUseGoogle')}</span>
            </div>

            <div className="flex-c-m">
              {/* <div
                className="login-social-item bg3"
                onClick={() => handleLoginGoogle()}
              >
                <i className="fab fa-google"></i>
              </div> */}
              {/* <div style={{ opacity: '0' }} id="google">
								<GoogleLogin
									onSuccess={credentialResponse => {
										console.log(credentialResponse.credential);
									}}
									onError={() => {
										console.log('error fail');
									}}
								/>
							</div> */}
            </div>

            <div className="flex-col-c">
              <span className="txt1">{t('orRegisterToUse')}</span>

              <Link to="/dang-ki" className="txt2">
                {t('register')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
