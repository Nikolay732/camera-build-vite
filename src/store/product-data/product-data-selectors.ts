import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getProductList = (state: State) => state[NameSpace.Product].productList;

export const getPromoList = (state: State) => state[NameSpace.Product].promoList;

export const getCurrentPage = (state: State) => state[NameSpace.Product].currentPage;

export const getDetailedProduct = (state: State) => state[NameSpace.Product].detailedProduct;

export const getSelectedProduct = (state: State) => state[NameSpace.Product].selectedProduct;

export const getStatusActiveModalAddItem = (state: State) => state[NameSpace.Product].isActiveModalAddItem;

export const getSimilarProductList = (state: State) => state[NameSpace.Product].similarProductList;

export const getProductListStatus = (state: State) => state[NameSpace.Product].isProductListLoading;

export const getPromoListStatus = (state: State) => state[NameSpace.Product].isPromoListLoading;

export const getDetailedProductStatus = (state: State) => state[NameSpace.Product].isDetailedProductLoading;

export const getSimilarProductListStatus = (state: State) => state[NameSpace.Product].isSimilarProductListLoading;

export const getErrorProductListStatus = (state: State) => state[NameSpace.Product].hasErrorProductList;

export const getErrorPromoListStatus = (state: State) => state[NameSpace.Product].hasErrorPromoList;

export const getErrorDetaildeProductStatus = (state: State) => state[NameSpace.Product].hasErrorDetailedProduct;

export const getErrorSimilarProductStatus = (state: State) => state[NameSpace.Product].hasErrorSimilarProductList;

export const getCatalogPageDataLoadStatus = createSelector([getProductListStatus, getPromoListStatus],
  (productListStatus, promoListStatus) => productListStatus || promoListStatus);

export const getProductPageDataLoadStatus = createSelector([getDetailedProductStatus, getSimilarProductListStatus],
  (detailedProductStatus, similarProductListStatus) => detailedProductStatus || similarProductListStatus);

export const getCatalogPageErrorLoadStatus = createSelector([getErrorProductListStatus, getErrorPromoListStatus],
  (errorProductListStatus, errorPromoListStatus) => errorProductListStatus || errorPromoListStatus);

export const getProductPageErrorLoadStatus = createSelector([getErrorDetaildeProductStatus, getErrorSimilarProductStatus],
  (errorDetailedProductStatus, errorSimilarProductStatus) => errorDetailedProductStatus || errorSimilarProductStatus);
