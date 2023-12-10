import { Action } from 'redux';
import { ProductCategoryValue, ProductLevelValue, ProductTypeValue, Status } from '../const';
import { ProductItem, PromoItem } from '../types/product';
import { faker } from '@faker-js/faker';
import { PostReview, Review } from '../types/review';
import { State } from '../types/state';

export const makeFakeProductItem = (): ProductItem => ({
  id: faker.helpers.rangeToNumber({min: 1, max: 999999}),
  name: faker.commerce.product(),
  vendorCode: faker.commerce.isbn(),
  type: faker.helpers.objectValue(ProductTypeValue),
  category: faker.helpers.objectValue(ProductCategoryValue),
  description: faker.lorem.words({min: 3, max: 10}),
  level: faker.helpers.objectValue(ProductLevelValue),
  price: faker.helpers.rangeToNumber({min: 1000, max: 500000}),
  rating: faker.helpers.rangeToNumber({min: 1, max: 5}),
  reviewCount: faker.helpers.rangeToNumber({min: 0, max: 10}),
  previewImg: faker.system.filePath(),
  previewImg2x: faker.system.filePath(),
  previewImgWebp: faker.system.filePath(),
  previewImgWebp2x: faker.system.filePath(),
});

export const makeFakeProductList = (): ProductItem[] => Array.from({length: 20}, makeFakeProductItem);

export const makeFakePromoProductList = (): PromoItem[] =>
  new Array(3).fill(null).map(() => ({
    id: faker.helpers.rangeToNumber({min: 1, max: 999999}),
    name: faker.commerce.product(),
    previewImg: faker.system.filePath(),
    previewImg2x: faker.system.filePath(),
    previewImgWebp: faker.system.filePath(),
    previewImgWebp2x: faker.system.filePath(),
  }));

export const makeFakeReviewList = (): Review[] =>
  new Array(10).fill(null).map(() => ({
    id: faker.string.uuid(),
    createAt: new Date().toISOString(),
    cameraId: faker.helpers.rangeToNumber({min: 1, max: 999999}),
    userName: faker.person.firstName(),
    advantage: faker.lorem.words({min: 3, max: 10}),
    disadvantage: faker.lorem.words({min: 3, max: 10}),
    review: faker.lorem.words({min: 3, max: 10}),
    rating: faker.helpers.rangeToNumber({min: 1, max: 5}),
  }));

export const makeFakePostReview = (): PostReview => ({
  cameraId: faker.helpers.rangeToNumber({min: 1, max: 999999}),
  userName: faker.person.firstName(),
  advantage: faker.lorem.words({min: 3, max: 10}),
  disadvantage: faker.lorem.words({min: 3, max: 10}),
  review: faker.lorem.words({min: 3, max: 10}),
  rating: faker.helpers.rangeToNumber({min: 1, max: 5}),
});

export const makeFakeSimilarProductList = (): ProductItem[] => Array.from({length: 10}, makeFakeProductItem);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  PRODUCT_LIST: {
    productList: [],
    isProductListLoading: false,
    hasErrorProductList: false,
  },
  PROMO_PRODUCT_LIST: {
    promoProductList: [],
    isPromoProductListLoading: false,
    hasErrorPromoProductList: false,
  },
  DETAILED_PRODUCT: {
    detailedProduct: null,
    isDetailedProductLoading: false,
    hasErrorDetailedProduct: false,
  },
  SIMILAR_PRODUCT_LIST: {
    similarProductList: [],
    isSimilarProductListLoading: false,
    hasErrorSimilarProductList: false,
  },
  REVIEW_LIST: {
    reviewList: [],
    isReviewListLoading: false,
    hasErrorReviewList: false,
    isActiveModalReview: false,
    isPostReviewSuccess: false,
    currentRating: 0,
  },
  BASKET_PRODUCT_LIST: {
    basketProductList: [],
    isActiveModalRemoveItem: false,
    isActiveModalSuccess: false,
    deletedProduct: null,
    discount: 0,
    promoCode: null,
    isPromoCodeValid: false,
    status: Status.Idle,
    hasError: false,
  },
  CATALOG: {
    sortType: null,
    sortOrder: null,
    category: null,
    type: [],
    level: [],
    minPrice: 0,
    maxPrice: 0,
    isReset: false,
    currentPage: 1,
    selectedProduct: null,
    isActiveModalAddItem: false,
    isActiveModalAddItemSuccess: false
  },
  ...(initialState ?? {})
});

export const extraActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);
