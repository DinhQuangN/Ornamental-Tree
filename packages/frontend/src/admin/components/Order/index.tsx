import Admin from '@/admin'
import { DataType as DataProduct } from '@/admin/components/Product'
import { useAppSelector } from '@/hook/useTypedSelector'
import { getAPI } from '@/utils/axios'
import { vnd } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { Pagination } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ICart extends DataProduct {
  quantity: number
}

export interface DataType {
  _id: string
  name: string
  total: number
  address: string
  status: string
  email: string
  products: ICart[]
  describe: string
  createdAt: Date
}

const Order = () => {
  const { t } = useTranslation('common', {
    keyPrefix: 'common.admin.orderForm',
  })
  const { auth } = useAppSelector((state) => state)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: getOrder } = useQuery({
    queryKey: ['fetchOrder', currentPage],
    queryFn: async () =>
      await getAPI(
        `getOrder?page=${currentPage}&limit=10`,
        auth.data?.access_token
      ),
    enabled: !!auth.data?.access_token,
  })
  const handlePage = (page: number, pageSize: number) => {
    setCurrentPage(page)
  }
  return (
    <Admin order="isActive">
      <div className="productAdminTable">
        <div style={{ width: '100%' }}>
          <div className="productTable">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('customer')}</th>
                  <th>{t('contact')}</th>
                  <th>{t('product')}</th>
                  <th>{t('total')}</th>
                  <th>{t('status')}</th>
                  <th>{t('address')}</th>
                  <th>{t('createdAt')}</th>
                </tr>
              </thead>
              <tbody>
                {getOrder?.data?.products.map(
                  (item: DataType, index: number) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <tr>
                          <th
                            style={{
                              borderRight: '1px solid #fff',
                              borderBottom: '1px solid #fff',
                            }}
                          >
                            {t('name')}
                          </th>
                          <th
                            style={{
                              borderRight: '1px solid #fff',
                              borderBottom: '1px solid #fff',
                            }}
                          >
                            {t('image')}
                          </th>
                          <th
                            style={{
                              borderRight: '1px solid #fff',
                              borderBottom: '1px solid #fff',
                            }}
                          >
                            {t('quantity')}
                          </th>
                          <th
                            style={{
                              borderBottom: '1px solid #fff',
                            }}
                          >
                            {t('price')}
                          </th>
                        </tr>
                        {item.products.map((i, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                borderRight: '1px solid #fff',
                              }}
                            >
                              {i.title.slice(0, 15) + '...'}
                            </td>
                            <td
                              style={{
                                borderRight: '1px solid #fff',
                              }}
                            >
                              <img src={i.imageArray[0].image} alt="" />
                            </td>
                            <td
                              style={{
                                borderRight: '1px solid #fff',
                              }}
                            >
                              {i.quantity}
                            </td>
                            <td>{vnd(i.price)}</td>
                          </tr>
                        ))}
                      </td>
                      <td>{vnd(item.total)}</td>
                      <td>{item.status ? t('paid') : t('unpaid')}</td>
                      <td>{item.address}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              defaultCurrent={1}
              total={getOrder?.data.total}
              onChange={handlePage}
            />
          </div>
        </div>
      </div>
    </Admin>
  )
}

export default Order
