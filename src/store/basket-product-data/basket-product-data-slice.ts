import { NameSpace } from '../../const';
import { BasketProduct, ProductItem } from '../../types/product';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type InitialState = {
  basketProductList: BasketProduct[];
  isActiveModalRemoveItem: boolean;
  deletedProduct: ProductItem | null;
};

const initialState: InitialState = {
  basketProductList: [],
  isActiveModalRemoveItem: false,
  deletedProduct: null,
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
      localStorage.setItem('basket', JSON.stringify(state.basketProductList));
    },
    setPrevCountItem: (state, action: PayloadAction<number>) => {
      state.basketProductList = state.basketProductList.map((item) =>
        item.product.id === action.payload ? {count: item.count - 1, product: item.product} : item);
      localStorage.setItem('basket', JSON.stringify(state.basketProductList));
    },
    setNextCountItem: (state, action: PayloadAction<number>) => {
      state.basketProductList = state.basketProductList.map((item) =>
        item.product.id === action.payload ? {count: item.count + 1, product: item.product} : item);
      localStorage.setItem('basket', JSON.stringify(state.basketProductList));
    },
    setCountItem: (state, action: PayloadAction<{id: number; count: number}>) => {
      state.basketProductList = state.basketProductList.map((item) =>
        item.product.id === action.payload.id ? {count: item.count, product: item.product} : item);
      localStorage.setItem('basket', JSON.stringify(state.basketProductList));
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.basketProductList = state.basketProductList.filter((item) => item.product.id !== action.payload);
      localStorage.setItem('basket', JSON.stringify(state.basketProductList));
    },
    resetBasket: (state) => {
      state.basketProductList = [];
      state.deletedProduct = null;
      state.isActiveModalRemoveItem = false;
      localStorage.removeItem('basket');
    },
    setStatusModalRemoveItem: (state, action: PayloadAction<boolean>) => {
      state.isActiveModalRemoveItem = action.payload;
    },
    setDeletedProduct: (state, action: PayloadAction<ProductItem>) => {
      state.deletedProduct = action.payload;
    }
  },
  extraReducers: {}
});

export const {
  addProductToBasket,
  setPrevCountItem,
  setNextCountItem,
  setCountItem,
  deleteItem,
  resetBasket,
  setStatusModalRemoveItem,
  setDeletedProduct,
} = basketProductData.actions;
