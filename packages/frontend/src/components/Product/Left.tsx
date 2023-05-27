import { DataType as DataCategory } from '@/admin/components/Category'
import { removeVietnameseTones } from '@/utils/utils'
import { UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface LeftProps {
  category: UseQueryResult<AxiosResponse<any, any>, unknown>
}

const Left = ({ category }: LeftProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'common.navbar' })

  return (
    <div className="menu">
      <div className="menu-left">
        <ul className="accordian-ul">
          <li>
            <h3>{t('trees')}</h3>
            <ul>
              {category.data?.data.map((item: DataCategory, index: number) =>
                item.role === 1 ? (
                  <li
                    key={index}
                    className={
                      location.pathname.split('/')[2] ===
                      removeVietnameseTones(item.name)
                        ? 'active'
                        : ''
                    }
                  >
                    <Link
                      to={`/chuyen-muc/${removeVietnameseTones(item.name)}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : (
                  ''
                )
              )}
            </ul>
          </li>
          <li>
            <h3>{t('ornamentalPlantPot')}</h3>
            <ul>
              {category.data?.data.map((item: DataCategory, index: number) =>
                item.role === 2 ? (
                  <li
                    key={index}
                    className={
                      location.pathname.split('/')[2] ===
                      removeVietnameseTones(item.name)
                        ? 'active'
                        : ''
                    }
                  >
                    <Link
                      to={`/chuyen-muc/${removeVietnameseTones(item.name)}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : (
                  ''
                )
              )}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Left
