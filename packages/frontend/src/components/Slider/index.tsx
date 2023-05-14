import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper } from 'swiper/react'

const Slider = () => {
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
        {/* {slide.data?.map((item: ISlide, index: number) => (
          <SwiperSlide key={index}>
            <img src={item.image} alt={item.image} />
          </SwiperSlide>
        ))} */}
      </Swiper>
    </section>
  )
}

export default Slider
