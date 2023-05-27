import DisplayProduct from '@/components/Product/DisplayProduct'
import { ProductItemProps } from '@/components/Product/Right'
import { getAPI } from '@/utils/axios'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useLocation } from 'react-router-dom'

interface DetailProps {
  product: UseQueryResult<AxiosResponse<any, any>, unknown>
}

const Detail = ({ product }: DetailProps) => {
  const { state } = useLocation()

  const { data } = useQuery({
    queryKey: ['fetchData'],
    queryFn: async () =>
      await getAPI(
        product.data?.data.some((x: ProductItemProps) => x._id.includes(state))
          ? `get_product/detail/${state}`
          : `accessory/detail/${state}`
      ),
    enabled: product.data?.status === 200,
  })
  return <>{data?.data && <DisplayProduct product={data?.data.product} />}</>
}

export default Detail
