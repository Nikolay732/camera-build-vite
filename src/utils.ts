import dayjs from 'dayjs';
import { Review } from './types/review';
import 'dayjs/locale/ru';
import { SortOrder, SortType } from './const';
import { ProductItem } from './types/product';

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
