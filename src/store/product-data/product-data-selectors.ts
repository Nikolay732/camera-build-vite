import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getProductList = (state: State) => state[NameSpace.Product].productList;

export const getPromoList = (state: State) => state[NameSpace.Product].promoList;

export const getCurrentPage = (state: State) => state[NameSpace.Product].currentPage;

export const getCurrentProduct = (state: State) => state[NameSpace.Product].currentProduct;

export const getStatusActiveModalAddItem = (state: State) => state[NameSpace.Product].isActiveModalAddItem;
