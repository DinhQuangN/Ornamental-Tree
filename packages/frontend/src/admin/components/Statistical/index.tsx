import Admin from '@/admin'
import { useAppSelector } from '@/hook/useTypedSelector'
import { getAPI } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'
import 'chart.js/auto'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

interface IOrder {
  _id: string
  count: number
}

const Statistical: React.FC = () => {
  const { t } = useTranslation('common', {
    keyPrefix: 'common.admin.statisticalForm',
  })
  const { auth } = useAppSelector((state) => state)
  const { data } = useQuery({
    queryKey: ['getOrder'],
    queryFn: () => getAPI('getOrderUser', auth.data?.access_token),
    enabled: !!auth.data?.access_token,
  })
  const chart = {
    labels: data?.data.map((item: IOrder) => item._id),
    datasets: [
      {
        label: t('quantitySold'),
        backgroundColor: [
          '#3e95cd',
          '#8e5ea2',
          '#3cba9f',
          '#e8c3b9',
          '#c45850',
        ],
        data: data?.data.map((item: IOrder) => item.count),
      },
    ],
  }
  return (
    <>
      <Admin dash="isActive">
        <Bar data={chart} />
      </Admin>
    </>
  )
}

export default Statistical
