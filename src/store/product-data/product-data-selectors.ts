import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getProductList = (state: State) => state[NameSpace.Product].productList;

export const getPromoList = (state: State) => state[NameSpace.Product].promoList;

export const getSelectedPage = (state: State) => state[NameSpace.Product].selectedPage;

export const getSelectedProduct = (state: State) => state[NameSpace.Product].selectedProduct;

export const getStatusActiveModalAddItem = (state: State) => state[NameSpace.Product].isActiveModalAddItem;
