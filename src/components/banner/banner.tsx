import { PromoItem } from '../../types/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BannerItem } from '../banner-item/banner-item';
import 'swiper/css';

type BannerProps = {
  promoList: PromoItem[];
}

export function Banner ({promoList}: BannerProps) {

  return (
    <div className="banner">
      <Swiper loop autoplay={{delay: 2000, stopOnLastSlide: false, disableOnInteraction:false}}>
        {promoList.map((promoProduct) => (
          <SwiperSlide key={promoProduct.id}>
            <BannerItem promoProduct={promoProduct}/>
          </SwiperSlide>)
        )}
      </Swiper>
    </div>
  );
}
