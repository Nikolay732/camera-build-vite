import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getProductList = (state: State) => state[NameSpace.Product].productList;

export const getPromoList = (state: State) => state[NameSpace.Product].promoList;

export const getCurrentPage = (state: State) => state[NameSpace.Product].currentPage;

export const getDetailedProduct = (state: State) => state[NameSpace.Product].detailedProduct;

export const getSelectedProduct = (state: State) => state[NameSpace.Product].selectedProduct;

export const getStatusActiveModalAddItem = (state: State) => state[NameSpace.Product].isActiveModalAddItem;

export const getSimilarProductList = (state: State) => state[NameSpace.Product].similarProductList;
