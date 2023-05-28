import { DataType as DataCategory } from '@/admin/components/Category'
import Product from '@/components/Product'
import ProductRight, { ProductItemProps } from '@/components/Product/Right'
import { getAPI } from '@/utils/axios'
import { removeVietnamese, removeVietnameseTones } from '@/utils/utils'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

interface ProductByCategoryProps {
  category: UseQueryResult<AxiosResponse<any, any>, unknown>
}

const ProductByCategory = ({ category }: ProductByCategoryProps) => {
  const { id } = useParams()
  const paramsId = id && removeVietnamese(id)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data } = useQuery({
    queryKey: ['getProductByCategory', paramsId, currentPage],
    queryFn: () =>
      getAPI(
        `get_product/category/${
          category.data?.data.filter(
            (x: DataCategory) =>
              removeVietnamese(removeVietnameseTones(x.name)) === paramsId
          )[0]._id
        }?page=${currentPage}&limit=10`
      ),
    enabled: category.data?.status === 200,
  })

  return (
    <div>
      <Product category={category}>
        <div className="shop-product">
          {data?.data.products.map((item: ProductItemProps, index: number) => (
            <ProductRight product={item} key={index} />
          ))}
        </div>
      </Product>
    </div>
  )
}

export default ProductByCategory
