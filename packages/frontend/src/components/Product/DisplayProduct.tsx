import { ImageList } from '@/admin/components/Product/FormProduct'
import { addCart } from '@/features/Cart'
import { useAppDispatch } from '@/hook/useTypedSelector'
import { vnd } from '@/utils/utils'
import { Image } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ProductProps } from './Right'

const DisplayProduct = ({ product }: ProductProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'common.detail' })
  const [quantity, setQuantity] = useState<number>(1)
  const dispatch = useAppDispatch()
  const handleQuantity = (type: any) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
  }
  const handleClick = () => {
    const data = { ...product, quantity }
    dispatch(addCart(data))
  }
  return (
    <>
      <title>{product.title}</title>
      <section id="details">
        <div className="details">
          <div className="product-pic">
            <Swiper
              slidesPerView={1}
              loop={true}
              grabCursor={true}
              // thumbs={{ swiper: activeThumb }}
              modules={[Thumbs]}
              className="frame-pic"
            >
              {product.imageArray?.map((item: ImageList, index: number) => (
                <SwiperSlide key={index}>
                  <Image height={350} src={item.image} alt={item.uid} />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              navigation={true}
              grabCursor={true}
              modules={[Navigation, Thumbs]}
              className="detail swiper"
            >
              <Image.PreviewGroup>
                {product.imageArray?.map((item: ImageList, index: number) => (
                  <SwiperSlide key={index}>
                    <Image height={80} src={item.image} alt={item.uid} />
                  </SwiperSlide>
                ))}
              </Image.PreviewGroup>
            </Swiper>
          </div>
          <div className="product-comment">
            <h3>{product.title}</h3>
            <div
              style={{
                fontSize: '1.5rem',
                lineHeight: '1.5',
                letterSpacing: '0.8px',
              }}
              dangerouslySetInnerHTML={{ __html: product.describe }}
            />
            <p>
              {t('price')}: <span>{vnd(product?.price)} đ</span>
            </p>
            <div className="product-cart">
              <div className="quantity">
                <button onClick={() => handleQuantity('dec')}>-</button>
                <p>{quantity}</p>
                <button onClick={() => handleQuantity('inc')}>+</button>
              </div>
              <Link to="/gio-hang" onClick={handleClick}>
                {t('buyNow')}
              </Link>

              <Link to="/gio-hang" onClick={handleClick}>
                {t('addCart')}
              </Link>
            </div>
          </div>
          <div className="product-commit">
            <div className="commit">
              <h3>VƯỜN CÂY VIỆT CAM KẾT:</h3>
              <p>{t('content1')}</p>
              <p>{t('content2')}</p>
              <p>{t('content3')}</p>
              <p>{t('content4')}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="content-page">
        <div className="content-page">
          <h3>{t('detail')}</h3>

          <div
            style={{
              marginTop: '30px',
              fontSize: '1.8rem',
              lineHeight: 1.5,
              letterSpacing: '1px ',
            }}
            dangerouslySetInnerHTML={{ __html: product?.detail }}
          />
          {/* <button className="submit" onClick={handleClick}>
						Mua ngay
					</button> */}
          {/* <button>
						<i className="fas fa-thumbs-up"></i>Thích
					</button>
					<button>Chia sẻ</button> */}
          <button>
            <Link to="/" style={{ color: '#fff' }}>
              {t('showMore')}
            </Link>
          </button>
        </div>
      </section>
    </>
  )
}

export default DisplayProduct
