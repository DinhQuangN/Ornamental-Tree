import { UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

interface SliderProps {
  slider: UseQueryResult<AxiosResponse<any, any>, unknown>
}

interface SliderData {
  _id: string
  image: string
}

const Slider = ({ slider }: SliderProps) => {
  return (
    <section id="slides">
      <Swiper
        slidesPerView={1}
        spaceBetween={5}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 3000 }}
        speed={1000}
        modules={[Pagination, Navigation, Autoplay]}
        className="slide container"
      >
        {slider.data?.data.map((item: SliderData, index: number) => (
          <SwiperSlide key={index}>
            <img src={item.image} alt={item.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Slider
