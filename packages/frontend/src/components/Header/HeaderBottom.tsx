import { Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

export interface HeaderBottomProps {
  onSearch?: (value: string) => void
}

const HeaderBottom = ({ onSearch }: HeaderBottomProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'common.headerBottom' })
  const navigate = useNavigate()

  const handleSearch = (value: string) => {
    navigate(`tim-kiem?search=${value}`)
    onSearch?.(value)
  }

  return (
    <section id="headers">
      <div className="header container">
        <div className="left">
          <div className="logo">
            <Link to="/">
              <img src="https://vuoncayviet.com/img/logo.png" alt="" />
            </Link>
          </div>
          <div className="widget-head">
            {t('vietnameseGarden')} <br />
            <span>{t('notJustBonsai')}</span>
          </div>
        </div>
        <div className="right">
          <Input.Search
            onSearch={handleSearch}
            allowClear
            size="large"
            placeholder={t('search')}
            enterButton={t('search')}
          />
        </div>
      </div>
    </section>
  )
}

export default HeaderBottom
