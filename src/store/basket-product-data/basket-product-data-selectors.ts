import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getBasketProductList = (state: State) => state[NameSpace.BasketProductList].basketProductList;
export const getDeletedProduct = (state: State) => state[NameSpace.BasketProductList].deletedProduct;
export const getStatusModalRemoveItem = (state: State) => state[NameSpace.BasketProductList].isActiveModalRemoveItem;
export const getStatusModalSuccess = (state: State) => state[NameSpace.BasketProductList].isActiveModalSuccess;

export const getDicsount = (state: State) => state[NameSpace.BasketProductList].discount;
export const getPromoCode = (state: State) => state[NameSpace.BasketProductList].promoCode;
export const getStatusValidPromoCode = (state: State) => state[NameSpace.BasketProductList].isPromoCodeValid;

export const getStatusPostOrder = (state: State) => state[NameSpace.BasketProductList].status;
export const getErrorStatus = (state: State) => state[NameSpace.BasketProductList].hasError;

export const getTotalPrice = createSelector([getBasketProductList], (productList) =>
  productList.reduce((sum, item) => item.product.price * item.count + sum, 0));

export const getCamerasIds = createSelector ([getBasketProductList], (productList) => {
  const camerasIds: number[] = [];
  productList.forEach((item) => camerasIds.push(item.product.id));
  return camerasIds;
});

export const getBonus = createSelector([getDicsount, getTotalPrice], (discount, totalPrice) =>
  Math.round(totalPrice * discount / 100));

export const getPayable = createSelector([getTotalPrice, getBonus], (totalPrice, bonus) =>
  Math.round(totalPrice - bonus));
