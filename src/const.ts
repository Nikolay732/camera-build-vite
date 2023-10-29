export const PER_PAGE = 9;

export const AUTOPLAY_DELAY = 3000;

export const FormatDate = {
  Date: 'DD MMMM',
  DateTime: 'YYYY-MM-DD',
} as const;

export const SimilarSwiperSetting = {
  SlidesPerView: 3,
  SlidesPerGroup: 3,
  SpaceBetween: 30,
};

export enum AppRoute {
  Catalog = '/',
  Product = '/cameras/:cameraId',
}

export const NameSpace = {
  ProductList: 'PRODUCT_LIST',
  PromoProductList: 'PROMO_PRODUCT_LIST',
  DetailedProduct: 'DETAILED_PRODUCT',
  SimilarProductList: 'SIMILAR_PRODUCT_LIST',
  ReviewList: 'REVIEW_LIST',
} as const;

export const APIRoute = {
  ProductList: '/cameras',
  DetailedProduct: '/cameras/:cameraId',
  PromoList: '/promo',
  SimilarProductList: '/cameras/:cameraId/similar',
  ReviewPost: '/reviews',
} as const;

export const RATINGS = [1, 2, 3, 4, 5] as const;

export const ReviewRatingValue = {
  '1': 'Отлично',
  '2': 'Хорошо',
  '3': 'Нормально',
  '4': 'Плохо',
  '5': 'Ужасно',
} as const;

export const ProductTypeValue = {
  Collection: 'Коллекционная',
  Instant: 'Моментальная',
  Digital: 'Цифровая',
  Film: 'Плёночная',
} as const;

export const ProductCategoryValue = {
  VideoCamera: 'Видеокамера',
  PhotoCamera: 'Фотоаппарат',
} as const;

export const ProductLevelValue = {
  Zero: 'Нулевой',
  Amateur: 'Любительский',
  Professional: 'Профессиональный',
} as const;

