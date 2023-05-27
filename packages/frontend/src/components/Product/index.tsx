import { UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import ProductLeft from './Left'

interface ProductProps {
  category: UseQueryResult<AxiosResponse<any, any>, unknown>
  children?: React.ReactNode
}

const Product = ({ category, children }: ProductProps) => {
  return (
    <div id="bg-dark">
      <div className="shops container">
        <ProductLeft category={category}/>
        <div className="shop">
          <div className="title">
            <Link to="">Sản phẩm bán chạy</Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Product
