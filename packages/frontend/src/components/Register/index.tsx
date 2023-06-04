import { FormData as FormLogin } from '@/components/Login'
import { postAPI } from '@/utils/axios'
import { useMutation } from '@tanstack/react-query'
import { notification } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface FormRegister extends FormLogin {
  firstName: string
  lastName: string
  confirmPassword: string
}

const Register = () => {
  const [data, setData] = useState<FormRegister>({
    firstName: '',
    lastName: '',
    confirmPassword: '',
    account: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const { t: common } = useTranslation('common', { keyPrefix: 'common.common' })
  const { t } = useTranslation('common', { keyPrefix: 'common.register' })

  const { mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: FormRegister) => await postAPI('register', data),
    onSuccess(data) {
      notification.success({ message: data.data.message })
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(data)
  }
  return (
    <div className="limiter">
      <title>{t('register')}</title>;
      <div className="containe">
        <div className="wrap-login">
          <form className="login-form validate-form" onSubmit={handleSubmit}>
            <span className="login-form-title">{t('register')}</span>
            <div
              className="wrap-input validate-input"
              data-validate="FirstName is required"
            >
              <span className="label-input">{t('firstName')}</span>
              <input
                className="input"
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
                placeholder={t('enterYourFirstName')}
              />
              <span className="focus-input" data-symbol="&#xf206;"></span>
            </div>
            <div
              className="wrap-input validate-input"
              data-validate="Username is required"
            >
              <span className="label-input">{t('lastName')}</span>
              <input
                className="input"
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                placeholder={t('enterYourLastName')}
              />
              <span className="focus-input" data-symbol="&#xf206;"></span>
            </div>
            <div
              className="wrap-input validate-input"
              data-validate="Username is required"
            >
              <span className="label-input">{common('account')}</span>
              <input
                className="input"
                type="email"
                name="account"
                value={data.account}
                onChange={(e) => setData({ ...data, account: e.target.value })}
                placeholder={t('enterYourEmail')}
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
            <div
              className="wrap-input validate-input"
              data-validate="Password is required"
            >
              <span className="label-input">{t('enterThePassword')}</span>
              <input
                className="input"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
                placeholder={t('reEnterYourPassword')}
              />
              <span className="focus-input" data-symbol="&#xf190;"></span>
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <i className="fa fa-eye-slash show" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-eye show" aria-hidden="true"></i>
                )}
              </span>
            </div>
            <div className="container-login-form-btn">
              <div className="wrap-login-form-btn">
                <div className="login-form-bgbtn"></div>
                <button className="login-form-btn" type="submit">
                  {t('register')}
                </button>
              </div>
            </div>
            <div className="flex-col-c">
              <span className="txt1">{t('doYouAlreadyHaveAnAccount?')}</span>

              <Link to="/dang-nhap" className="txt2">
                {t('login')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
