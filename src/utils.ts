import dayjs from 'dayjs';
import { Review } from './types/review';
import 'dayjs/locale/ru';
import { NameLocaleStorage, SortOrder, SortType } from './const';
import { BasketProduct, ProductCategory, ProductItem, ProductLevel, ProductType } from './types/product';
import { CouponType } from './types/coupon';

export const getFormatDate = (date: string, format: string) => dayjs(date).locale('ru').format(format);

export const getSortByDate = (a: Review, b: Review) => {
  const dateA = new Date(a.createAt);
  const dateB = new Date(b.createAt);
  return Number(dateB) - Number (dateA);
};

export const sortTypeMap = {
  [SortType.Popular]: (productList: ProductItem[]) => [...productList].sort((a, b) => b.rating - a.rating),
  [SortType.Price]: (productList: ProductItem[]) => [...productList].sort((a, b) => b.price - a.price)
};

export const sortOrderMap = {
  [SortOrder.Up]: (productList: ProductItem[]) => productList.reverse(),
  [SortOrder.Down]: (productList: ProductItem[]) => productList,
};

export const sortProductList = (productList: ProductItem[], sortType: SortType | null, sortOrder: SortOrder | null) => {
  const sortedProductListByType = sortType ? sortTypeMap[sortType](productList) : [...productList];
  const sortedProductListByOrder = sortOrder ? sortOrderMap[sortOrder](sortedProductListByType) : [...productList];
  return sortedProductListByOrder;
};

export const filterProductByCategory = (productList: ProductItem[], category: ProductCategory | null) => {
  if (!category) {
    return productList;
  }
  const filteredProductList = [...productList].filter((product) => product.category === category);
  return filteredProductList;
};

export const filterProductByType = (productList: ProductItem[], types: ProductType[]) => {
  if (!types.length) {
    return productList;
  }
  const filteredProductList = [...productList].filter((product) => types.includes(product.type));
  return filteredProductList;
};

export const filterProductByLevel = (productList: ProductItem[], levels: ProductLevel[]) => {
  if (!levels.length) {
    return productList;
  }
  const filteredProductList = [...productList].filter((product) => levels.includes(product.level));
  return filteredProductList;
};

export const filterProductByPrice = (productList: ProductItem[], minPrice: number, maxPrice: number) => {
  if (!minPrice && !maxPrice) {
    return productList;
  }
  if (!maxPrice) {
    maxPrice = Infinity;
  }
  const filteredProductList = productList.filter((product) => product.price >= minPrice && product.price <= maxPrice);
  return filteredProductList;
};

export const filterProductList = (
  productList: ProductItem[],
  category: ProductCategory | null,
  types: ProductType[],
  levels: ProductLevel[],
  minPrice: number,
  maxPrice: number,
) => {
  const filteredProductListByCategory = filterProductByCategory(productList, category);
  const filteredProductListByType = filterProductByType(filteredProductListByCategory, types);
  const filteredProductListByLevel = filterProductByLevel(filteredProductListByType, levels);
  const filteredProductListByPrice = filterProductByPrice(filteredProductListByLevel, minPrice, maxPrice);
  return filteredProductListByPrice;
};

export const getMinPrice = (productList: ProductItem[]) => {
  if (!productList.length) {
    return 0;
  }
  const sortedProductList = [...productList].sort((a, b) => a.price - b.price);
  return sortedProductList[0].price;
};

export const getMaxPrice = (productList: ProductItem[]) => {
  if (!productList.length) {
    return 0;
  }
  const sortedProductList = [...productList].sort((a, b) => b.price - a.price);
  return sortedProductList[0].price;
};

export const getBasketProductListFromLS = () => {
  const data = localStorage.getItem(NameLocaleStorage.Basket);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const productList = data ? JSON.parse(data) : [];
  return {
    productList: productList as BasketProduct[]
  };
};

export const getPromoCodeLS = () => {
  const data = localStorage.getItem(NameLocaleStorage.PromoCode);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const promoCode = data ? JSON.parse(data) : null;
  return {
    promoCode: promoCode as CouponType
  };
};

export const getDicsountLS = () => {
  const data = localStorage.getItem(NameLocaleStorage.Discount);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const discount = data ? JSON.parse(data) : 0;
  return {
    discount: discount as number
  };
};
