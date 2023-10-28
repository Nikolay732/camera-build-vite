import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { getErrorStatusSimilarProduct, getStatusSimilarProductListLoading } from '../similar-product-data/similar-product-data-selectors';

export const getDetailedProduct = (state: State) => state[NameSpace.DetailedProduct].detailedProduct;

export const getStatusDetailedProductLoading = (state: State) => state[NameSpace.DetailedProduct].isDetailedProductLoading;

export const getErrorStatusDetaildeProduct = (state: State) => state[NameSpace.DetailedProduct].hasErrorDetailedProduct;

export const getProductPageDataLoadStatus = createSelector([getStatusDetailedProductLoading, getStatusSimilarProductListLoading],
  (isDetailedProductLoading, isSimilarProductListLoading) => isDetailedProductLoading || isSimilarProductListLoading);

export const getProductPageErrorLoadStatus = createSelector([getErrorStatusDetaildeProduct, getErrorStatusSimilarProduct],
  (hasErrorDetailedProduct, hasErrorSimilarProduct) => hasErrorDetailedProduct || hasErrorSimilarProduct);
