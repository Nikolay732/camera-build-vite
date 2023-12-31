export const AUTOPLAY_DELAY = 3000;
export const MIN_LENGTH_FOR_SEARCH = 3;
export const DROPDOWN_COUNT = 4;

export const Page = {
  Per: 9,
  MaxPagesCount: 3
} as const;

export const FormatDate = {
  Date: 'DD MMMM',
  DateTime: 'YYYY-MM-DD',
} as const;

export const SimilarSwiperSetting = {
  SlidesPerView: 3,
  SlidesPerGroup: 3,
  SpaceBetween: 30,
} as const;

export enum AppRoute {
  Catalog = '/',
  Product = '/product',
  Basket = '/basket',
  NotFound = '/404',
}

export const NameSpace = {
  ProductList: 'PRODUCT_LIST',
  PromoProductList: 'PROMO_PRODUCT_LIST',
  DetailedProduct: 'DETAILED_PRODUCT',
  SimilarProductList: 'SIMILAR_PRODUCT_LIST',
  ReviewList: 'REVIEW_LIST',
  BasketProductList: 'BASKET_PRODUCT_LIST',
  Catalog: 'CATALOG',
} as const;

export const APIRoute = {
  ProductList: '/cameras',
  DetailedProduct: '/cameras/:cameraId',
  PromoList: '/promo',
  SimilarProductList: '/cameras/:cameraId/similar',
  ReviewPost: '/reviews',
  ReviewList: '/cameras/:cameraId/reviews',
  Coupon: '/coupons',
  Order: '/orders',
} as const;

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export const RATINGS = [1, 2, 3, 4, 5] as const;

export const ReviewRatingValue = {
  '1': 'Отлично',
  '2': 'Хорошо',
  '3': 'Нормально',
  '4': 'Плохо',
  '5': 'Ужасно',
} as const;

export const ProductTypeValue = {
  Digital: 'Цифровая',
  Film: 'Плёночная',
  Snapshot: 'Моментальная',
  Collection: 'Коллекционная',
} as const;

export const ProductCategoryValue = {
  PhotoCamera: 'Фотоаппарат',
  VideoCamera: 'Видеокамера',
} as const;

export const ProductLevelValue = {
  Zero: 'Нулевой',
  'non-professional': 'Любительский',
  Professional: 'Профессиональный',
} as const;

export const ProductTabURL = {
  Description: 'description',
  Characteristics: 'characteristics',
} as const;

export const KeyCode = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  Esc: 'Escape',
  Enter: 'Enter',
} as const;

export enum SortType {
  Price = 'по цене',
  Popular = 'по популярности'
}

export enum SortOrder {
  Up = 'по возрастанию',
  Down = 'по убыванию',
}

export const CountProductBasket = {
  MIN: 1,
  MAX: 99
} as const;

export const NameLocaleStorage = {
  Basket: 'basket',
  PromoCode: 'promo code',
  Discount: 'discount',
} as const;

export const CouponValue = {
  'camera-333': 'camera-333',
  'camera-444': 'camera-444',
  'camera-555': 'camera-555',
} as const;
