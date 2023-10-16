export const PER_PAGE = 9;

export const AUTOPLAY_DELAY = 3000;

export const SimilarSwiperSetting = {
  SlidesPerView: 3,
  SlidesPerGroup: 3,
  SpaceBetween: 30,
};

export const AppRoute = {
  Catalog: '/',
  Product: '/cameras/:cameraId',
} as const;

export const NameSpace = {
  Product: 'PRODUCT',
} as const;

export const APIRoute = {
  ProductList: '/cameras',
  PromoList: '/promo',
  SimilarProductList: '/similar',
} as const;

export const RATINGS = [1, 2, 3, 4, 5] as const;

