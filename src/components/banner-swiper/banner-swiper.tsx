import { PromoItem } from '../../types/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Banner } from '../../components/banner/banner';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './banner-swiper.css';
import { AUTOPLAY_DELAY } from '../../const';

type BannerSwiperProps = {
  promoList: PromoItem[];
}

export function BannerSwiper ({promoList}: BannerSwiperProps) {
  return (
    <Swiper
      className='mySwiper'
      autoplay={{
        delay: AUTOPLAY_DELAY,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
    >
      {promoList.map((promoProduct) => (
        <SwiperSlide key={promoProduct.id}>
          <Banner promoProduct={promoProduct}/>
        </SwiperSlide>)
      )}
    </Swiper>
  );
}
