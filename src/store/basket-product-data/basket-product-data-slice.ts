import { NameLocaleStorage, NameSpace, Status } from '../../const';
import { BasketProduct, ProductItem } from '../../types/product';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { getBasketProductListFromLS, getDicsountLS, getPromoCodeLS } from '../../utils';
import { Coupon } from '../../types/coupon';
import { postCouponAction, postOrderAction } from './basket-product-data-thunk';

const {productList} = getBasketProductListFromLS();
const {promoCode} = getPromoCodeLS();
const {discount} = getDicsountLS();

type InitialState = {
  basketProductList: BasketProduct[];
  isActiveModalRemoveItem: boolean;
  isActiveModalSuccess: boolean;
  deletedProduct: ProductItem | null;
  discount: number;
  promoCode: Coupon | null;
  isPromoCodeValid: boolean;
  status: Status;
  hasError: boolean;
};

const initialState: InitialState = {
  basketProductList: productList,
  isActiveModalRemoveItem: false,
  isActiveModalSuccess: false,
  deletedProduct: null,
  discount: discount,
  promoCode: promoCode,
  isPromoCodeValid: false,
  status: Status.Idle,
  hasError: false,
};

export const basketProductData = createSlice ({
  name: NameSpace.BasketProductList,
  initialState,
  reducers: {
    addProductToBasket: (state, action: PayloadAction<ProductItem>) => {
      if (!state.basketProductList.some((item) => item.product.id === action.payload.id)) {
        state.basketProductList.push({count: 1, product: action.payload});
      } else {
        state.basketProductList = state.basketProductList.map((item) =>
          item.product.id === action.payload.id ? {count: item.count + 1, product: item.product} : item);
      }
      localStorage.setItem(NameLocaleStorage.Basket, JSON.stringify(state.basketProductList));
    },
    setPrevCountItem: (state, action: PayloadAction<number>) => {
      state.basketProductList = state.basketProductList.map((item) =>
        item.product.id === action.payload ? {count: item.count - 1, product: item.product} : item);
      localStorage.setItem(NameLocaleStorage.Basket, JSON.stringify(state.basketProductList));
    },
    setNextCountItem: (state, action: PayloadAction<number>) => {
      state.basketProductList = state.basketProductList.map((item) =>
        item.product.id === action.payload ? {count: item.count + 1, product: item.product} : item);
      localStorage.setItem(NameLocaleStorage.Basket, JSON.stringify(state.basketProductList));
    },
    setCountItem: (state, action: PayloadAction<{id: number; count: number}>) => {
      state.basketProductList = state.basketProductList.map((item) =>
        item.product.id === action.payload.id ? {count: item.count, product: item.product} : item);
      localStorage.setItem(NameLocaleStorage.Basket, JSON.stringify(state.basketProductList));
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.basketProductList = state.basketProductList.filter((item) => item.product.id !== action.payload);
      state.deletedProduct = null;
      localStorage.setItem(NameLocaleStorage.Basket, JSON.stringify(state.basketProductList));
    },
    setPromoCode: (state, action: PayloadAction<Coupon>) => {
      state.promoCode = action.payload;
    },
    resetBasket: (state) => {
      state.basketProductList = [];
      state.discount = 0;
      state.promoCode = null;
      state.isPromoCodeValid = false;
      state.status = Status.Idle;
      localStorage.removeItem(NameLocaleStorage.Basket);
      localStorage.removeItem(NameLocaleStorage.Discount);
      localStorage.removeItem(NameLocaleStorage.PromoCode);
    },
    setStatusModalRemoveItem: (state, action: PayloadAction<boolean>) => {
      state.isActiveModalRemoveItem = action.payload;
    },
    setStatusModalSuccess: (state, action: PayloadAction<boolean>) => {
      state. isActiveModalSuccess = action.payload;
    },
    setDeletedProduct: (state, action: PayloadAction<ProductItem>) => {
      state.deletedProduct = action.payload;
    }
  },
  extraReducers (builder) {
    builder
      .addCase(postCouponAction.fulfilled, (state, action: PayloadAction<number>) => {
        state.discount = action.payload;
        state.isPromoCodeValid = true;
        state.hasError = false;
        localStorage.setItem(NameLocaleStorage.Discount, JSON.stringify(state.discount));
        localStorage.setItem(NameLocaleStorage.PromoCode, JSON.stringify(state.promoCode));
      })
      .addCase(postCouponAction.pending, (state) => {
        state.isPromoCodeValid = false;
        state.hasError = false;
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.hasError = true;
        state.isPromoCodeValid = false;
        state.discount = 0;
        localStorage.removeItem(NameLocaleStorage.Discount);
        localStorage.removeItem(NameLocaleStorage.PromoCode);
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.status = Status.Success;
        state.isActiveModalSuccess = true;
      })
      .addCase(postOrderAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.status = Status.Error;
        state.isActiveModalSuccess = true;
      });
  }
});

export const {
  addProductToBasket,
  setPrevCountItem,
  setNextCountItem,
  setCountItem,
  deleteItem,
  setPromoCode,
  resetBasket,
  setStatusModalRemoveItem,
  setStatusModalSuccess,
  setDeletedProduct,
} = basketProductData.actions;
