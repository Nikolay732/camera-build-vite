import { NameSpace } from '../../const';
import { BasketProduct, ProductItem } from '../../types/product';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type InitialState = {
  basketProductList: BasketProduct[];
};

const initialState: InitialState = {
  basketProductList: [],
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
    },
  },
  extraReducers: {}
});

export const {addProductToBasket} = basketProductData.actions;
