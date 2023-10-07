import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getProductList = (state: State) => state[NameSpace.Product].ProductList;

export const getPromoList = (state: State) => state[NameSpace.Product].PromoList;
