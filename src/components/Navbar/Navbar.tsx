import { clsx } from 'clsx'
import { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [scroll, setScroll] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)

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
    { to: '/', name: 'Trang Chu' },
    { to: '/gioi-thieu', name: 'Gioi thieu' },
    { to: '#', name: 'Cay canh' },
    { to: '#', name: 'Chau canh' },
    { to: '/phu-kien-cay-canh', name: 'Phu kien cay canh' },
  ]
  return (
    <section id="navbars" className={scroll ? 'shrink' : ''}>
      <div className="navbar container">
        <div className="navbar_menu">
          <i className="fas fa-bars" onClick={() => setMenu(!menu)}></i>
          <span>Menu</span>
          <ul className={clsx(menu ? '!block' : '!hidden')}>
            {rows.map((x, i) => (
              <li key={i}>
                <Link to={x.to}>
                  {x.name}
                  {x.name === 'Cay canh' && (
                    <div className="triangle-down"></div>
                  )}
                  {x.name === 'Chau canh' && (
                    <div className="triangle-down"></div>
                  )}
                </Link>
                {x.name === 'Cay canh' && (
                  <ul>
                    {/* {category.data?.map(
                    (item: ICategory, index: number) =>
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
                  )} */}
                  </ul>
                )}
                {x.name === 'Chau canh' && (
                  <ul>
                    {/* {category.data?.map(
                    (item: ICategory, index: number) =>
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
                  )} */}
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
                {x.name === 'Cay canh' && <div className="triangle-down"></div>}
                {x.name === 'Chau canh' && (
                  <div className="triangle-down"></div>
                )}
              </Link>
              {x.name === 'Cay canh' && (
                <ul>
                  {/* {category.data?.map(
                    (item: ICategory, index: number) =>
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
                  )} */}
                </ul>
              )}
              {x.name === 'Chau canh' && (
                <ul>
                  {/* {category.data?.map(
                    (item: ICategory, index: number) =>
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
                  )} */}
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
