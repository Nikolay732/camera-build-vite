import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getBasketProductList = (state: State) => state[NameSpace.BasketProductList].basketProductList;
export const getDeletedProduct = (state: State) => state[NameSpace.BasketProductList].deletedProduct;
export const getStatusModalRemoveItem = (state: State) => state[NameSpace.BasketProductList].isActiveModalRemoveItem;

export const getDicsount = (state: State) => state[NameSpace.BasketProductList].discount;
export const getPromoCode = (state: State) => state[NameSpace.BasketProductList].promoCode;
export const getStatusValidPromoCode = (state: State) => state[NameSpace.BasketProductList].isPromoCodeValid;

export const getPostOrderStatus = (state: State) => state[NameSpace.BasketProductList].status;
