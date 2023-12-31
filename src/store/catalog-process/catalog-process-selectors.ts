import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Page } from '../../const';
import { State } from '../../types/state';
import { getProductList } from '../product-list-data/product-list-data-selectors';
import { filterProductList, sortProductList } from '../../utils';

export const getSortType = (state: State) => state[NameSpace.Catalog].sortType;
export const getSortOrder = (state: State) => state[NameSpace.Catalog].sortOrder;

export const getFilterCategory = (state: State) => state[NameSpace.Catalog].category;
export const getFilterType = (state: State) => state[NameSpace.Catalog].type;
export const getFilterLevel = (state: State) => state[NameSpace.Catalog].level;

export const getFilterMinPrice = (state: State) => state[NameSpace.Catalog].minPrice;
export const getFilterMaxPrice = (state: State) => state[NameSpace.Catalog].maxPrice;

export const getFilterResetStatus = (state: State) => state[NameSpace.Catalog].isReset;

export const getCurrentPage = (state: State) => state[NameSpace.Catalog].currentPage;
export const getSelectedProduct = (state: State) => state[NameSpace.Catalog].selectedProduct;
export const getStatusActiveModalAddItem = (state: State) => state[NameSpace.Catalog].isActiveModalAddItem;
export const getStatusActiveModalAddItemSuccess = (state: State) => state[NameSpace.Catalog].isActiveModalAddItemSuccess;

export const getSortedProductList = createSelector(
  [getProductList, getSortType, getSortOrder],
  (productList, sortType, sortOrder) => sortProductList(productList, sortType, sortOrder)
);

export const getFilteredProductList = createSelector(
  [getSortedProductList, getFilterCategory, getFilterType, getFilterLevel, getFilterMinPrice, getFilterMaxPrice],
  (productList, category, type, level, minPrice, maxPrice) =>
    filterProductList(productList, category, type, level, minPrice, maxPrice)
);

export const getTotalCountPage = createSelector([getFilteredProductList], (productList) => {
  const totalCountProduct = productList.length;
  const totalCountPage = Math.ceil(totalCountProduct / Page.Per);
  return totalCountPage;
});

export const getCurrentProductList = createSelector([getFilteredProductList, getCurrentPage], (productList, currentPage) => {
  const lastProductIndex = currentPage * Page.Per;
  const firstProductIndex = lastProductIndex - Page.Per;
  const currentProductList = productList.slice(firstProductIndex, lastProductIndex);
  return currentProductList;
});
