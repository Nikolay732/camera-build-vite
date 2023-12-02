import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getBasketProductList = (state: State) => state[NameSpace.BasketProductList].basketProductList;
export const getDelededProduct = (state: State) => state[NameSpace.BasketProductList].deletedProduct;
export const getStatusModalRemoveItem = (state: State) => state[NameSpace.BasketProductList].isActiveModalRemoveItem;
