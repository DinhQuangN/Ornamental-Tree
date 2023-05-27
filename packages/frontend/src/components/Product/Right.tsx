import { DataType as DataCategory } from '@/admin/components/Category'
import { ImageList } from '@/admin/components/Product/FormProduct'
import { IUser } from '@/features/Auth'
import { removeVietnameseTones, vnd } from '@/utils/utils'
import { Link } from 'react-router-dom'

export interface ProductItemProps {
  _id: string
  user: IUser | string
  title: string
  describe: string
  price: string
  imageArray: ImageList[]
  detail: string
  category: DataCategory[] | string
  createdAt?: string
  updatedAt?: string
}

export interface ProductProps {
  product: ProductItemProps
}

const Right = ({ product }: ProductProps) => {
  return (
    <div className="product">
      {/* <title>{product.category.name}</title> */}
      <div className="pic-news">
        <Link
          to={`/san-pham/${removeVietnameseTones(product.title)}`}
          state={product._id}
        >
          <img src={product?.imageArray[0]?.image} alt={product.title} />
        </Link>
      </div>
      <h3>
        <Link
          to={`/san-pham/${removeVietnameseTones(product?.title)}`}
          state={product._id}
        >
          {product?.title.slice(0, 25) + '...'}
        </Link>
      </h3>
      <div className="col-row">
        <div className="price-product">{vnd(product.price)}đ</div>
        <div className="cart-product">
          {/* <Link to="/gio-hang" onClick={handleClick}>
          <i className="fas fa-shopping-cart"></i>
        </Link> */}
          <Link
            to={`/san-pham/${removeVietnameseTones(product?.title)}`}
            state={product._id}
          >
            <i className="fas fa-eye"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Right
