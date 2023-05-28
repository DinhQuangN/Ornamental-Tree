import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'common.footer' })
  return (
    <section id="footer">
      <div className="footer container">
        <div className="menu-footer">
          <div className="left">
            <h3>{t('fastAccess')}</h3>
            <ul>
              <li>
                <Link to="#">{t('introduce')}</Link>
              </li>
              <li>
                <Link to="#">{t('service')}</Link>
              </li>
              <li>
                <Link to="#">{t('blog_new')}</Link>
              </li>
              <li>
                <Link to="#">{t('support')}</Link>
              </li>
              <li>
                <Link to="#">{t('exchangePolicy')}</Link>
              </li>
            </ul>
          </div>
          <div className="right">
            <h3>{t('contact')}</h3>
            <p>{t('content')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
