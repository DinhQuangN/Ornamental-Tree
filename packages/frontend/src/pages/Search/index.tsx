import Product from '@/components/Product'
import ProductRight, { ProductItemProps } from '@/components/Product/Right'
import { getAPI } from '@/utils/axios'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

interface SearchProps {
  category: UseQueryResult<AxiosResponse<any, any>, unknown>
  keyword: string
}

const Search = ({ category, keyword }: SearchProps) => {
  const { data } = useQuery({
    queryKey: ['search', keyword],
    queryFn: () => getAPI(`get_product_search?search=${keyword}`),
  })
  return (
    <div>
      <Product category={category}>
        <div className="shop-product">
          {data?.data.map((item: ProductItemProps, index: number) => (
            <ProductRight product={item} key={index} />
          ))}
        </div>
      </Product>
    </div>
  )
}

export default Search
