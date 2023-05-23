import { DataType as DataCategory } from '@/admin/components/Category'
import { removeVietnameseTones } from '@/utils/utils'
import { UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { clsx } from 'clsx'
import { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface DataNavbar {
  category: UseQueryResult<AxiosResponse<any, any>, unknown>
}

const Navbar = ({ category }: DataNavbar) => {
  const [scroll, setScroll] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)
  const { t } = useTranslation('common', { keyPrefix: 'common.navbar' })

  useLayoutEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 91 ||
        document.documentElement.scrollTop > 91
      ) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    })
  })
  const rows = [
    { to: '/', name: t('home') },
    { to: '/gioi-thieu', name: t('introduce') },
    { to: '#', name: t('trees') },
    { to: '#', name: t('ornamentalPlantPot') },
    { to: '/phu-kien-cay-canh', name: t('bonsaiAccessories') },
  ]
  return (
    <section id="navbars" className={scroll ? 'shrink' : ''}>
      <div className="navbar container">
        <div className="navbar_menu">
          <i className="fas fa-bars" onClick={() => setMenu(!menu)}></i>
          <span>Menu</span>
          <ul className={clsx(menu ? 'block' : 'hidden')}>
            {rows.map((x, i) => (
              <li key={i}>
                <Link to={x.to}>
                  {x.name}
                  {x.name === t('trees') && (
                    <div className="triangle-down"></div>
                  )}
                  {x.name === t('ornamentalPlantPot') && (
                    <div className="triangle-down"></div>
                  )}
                </Link>
                {x.name === t('trees') && (
                  <ul>
                    {category.data?.data.map(
                      (item: DataCategory, index: number) =>
                        item.role === 1 && (
                          <li key={index}>
                            <Link
                              to={`/chuyen-muc/${removeVietnameseTones(
                                item.name
                              )}`}
                            >
                              {item.name}
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                )}
                {x.name === t('ornamentalPlantPot') && (
                  <ul>
                    {category.data?.data.map(
                      (item: DataCategory, index: number) =>
                        item.role === 2 && (
                          <li key={index}>
                            <Link
                              to={`/chuyen-muc/${removeVietnameseTones(
                                item.name
                              )}`}
                            >
                              {item.name}
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <ul>
          {rows.map((x, i) => (
            <li key={i}>
              <Link to={x.to}>
                {x.name}
                {x.name === t('trees') && <div className="triangle-down"></div>}
                {x.name === t('ornamentalPlantPot') && (
                  <div className="triangle-down"></div>
                )}
              </Link>
              {x.name === t('trees') && (
                <ul>
                  {category.data?.data.map(
                    (item: DataCategory, index: number) =>
                      item.role === 1 && (
                        <li key={index}>
                          <Link
                            to={`/chuyen-muc/${removeVietnameseTones(
                              item.name
                            )}`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              )}
              {x.name === t('ornamentalPlantPot') && (
                <ul>
                  {category.data?.data.map(
                    (item: DataCategory, index: number) =>
                      item.role === 2 && (
                        <li key={index}>
                          <Link
                            to={`/chuyen-muc/${removeVietnameseTones(
                              item.name
                            )}`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Navbar
