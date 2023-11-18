import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { getProductList } from '../product-list-data/product-list-data-selectors';
import { sortProductList } from '../../utils';

export const getSortType = (state: State) => state[NameSpace.Catalog].sortType;
export const getSortOrder = (state: State) => state[NameSpace.Catalog].sortOrder;

export const getFilterCategory = (state: State) => state[NameSpace.Catalog].category;
export const getFilterType = (state: State) => state[NameSpace.Catalog].type;
export const getFilterLevel = (state: State) => state[NameSpace.Catalog].level;

export const getSortedProductList = createSelector(
  [getProductList, getSortType, getSortOrder],
  (productList, sortType, sortOrder) => sortProductList(productList, sortType, sortOrder)
);
