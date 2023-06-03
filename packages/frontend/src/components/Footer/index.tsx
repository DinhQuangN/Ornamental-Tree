import { Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface FooterProps {
  onChange: (value: string) => void
}

const Footer = ({ onChange }: FooterProps) => {
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
            <div
              style={{
                fontSize: '20px',
              }}
            >
              {t('chooseLanguage')}
              <Select
                defaultValue="VietNamese"
                style={{ width: 120 }}
                onChange={onChange}
                options={[
                  { value: 'vi', label: 'VietNamese' },
                  { value: 'en', label: 'English' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
