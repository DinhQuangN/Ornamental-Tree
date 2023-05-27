import Product from '@/components/Product'
import ProductRight, { ProductItemProps } from '@/components/Product/Right'
import { useAppSelector } from '@/hook/useTypedSelector'
import { getAPI } from '@/utils/axios'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useState } from 'react'

interface AccessoryProps {
  category: UseQueryResult<AxiosResponse<any, any>, unknown>
}

const Accessory = ({ category }: AccessoryProps) => {
  const { auth } = useAppSelector((state) => state)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: accessory } = useQuery({
    queryKey: ['fetchAccessory', currentPage],
    queryFn: async () =>
      await getAPI(
        `accessory?page=${currentPage}&limit=10`,
        auth.data?.access_token
      ),
  })

  return (
    <div>
      <Product category={category}>
        <div className="shop-product">
          {accessory?.data.products.map(
            (item: ProductItemProps, index: number) => (
              <ProductRight product={item} key={index} />
            )
          )}
        </div>
      </Product>
    </div>
  )
}

export default Accessory
