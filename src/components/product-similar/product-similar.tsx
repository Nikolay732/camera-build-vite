import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCardItem } from '../product-card-item/product-card-item';
import {Navigation} from 'swiper/modules';
import { ProductItem } from '../../types/product';
import 'swiper/css';
import 'swiper/css/navigation';
import './product-similar.css';

type ProductSimilarProps = {
  similarProductList: ProductItem[];
}

export function ProductSimilar ({similarProductList}: ProductSimilarProps) {

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            <Swiper
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={30}
              modules={[Navigation]}
              navigation={{
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next'
              }}
              className='mySwiper'
            >
              {similarProductList.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCardItem product={product} isSimilarProduct style={{width: '100%', margin: 0}}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            style={{pointerEvents: 'auto'}}
            disabled
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            style={{pointerEvents: 'auto'}}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
