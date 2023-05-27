import Product from '@/components/Product'
import ProductRight, { ProductItemProps } from '@/components/Product/Right'
import Slider from '@/components/Slider'
import { UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'

interface HomeProps {
  category: UseQueryResult<AxiosResponse<any, any>, unknown>
  product: UseQueryResult<AxiosResponse<any, any>, unknown>
}

const Home = ({ category, product }: HomeProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'common.home' })

  return (
    <>
      <title>{t('bonsaiGarden')}</title>
      <Slider />
      <Product category={category}>
        <div className="shop-product">
          {product.data?.data.map((item: ProductItemProps, index: number) => (
            <ProductRight product={item} key={index} />
          ))}
        </div>
      </Product>
    </>
  )
}

export default Home
