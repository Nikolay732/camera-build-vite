import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { getErrorStatusPromoProductList, getStatusPromoProductListLoading } from '../promo-product-data/promo-product-data-selectors';

export const getProductList = (state: State) => state[NameSpace.ProductList].productList;
export const getStatusProductListLoading = (state: State) => state[NameSpace.ProductList].isProductListLoading;
export const getErrorStatusProductList = (state: State) => state[NameSpace.ProductList].hasErrorProductList;

export const getCatalogPageDataLoadingStatus = createSelector([getStatusProductListLoading, getStatusPromoProductListLoading],
  (isProductListLoading, isPromoListLoading) => isProductListLoading || isPromoListLoading);

export const getCatalogPageErrorLoadStatus = createSelector([getErrorStatusProductList, getErrorStatusPromoProductList],
  (errorProductListStatus, errorPromoListStatus) => errorProductListStatus || errorPromoListStatus);

