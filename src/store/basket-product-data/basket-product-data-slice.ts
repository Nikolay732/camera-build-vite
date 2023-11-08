import { NameSpace } from '../../const';
import { ProductItem } from '../../types/product';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type InitialState = {
  basketProductList: ProductItem[];
};

const initialState: InitialState = {
  basketProductList: [],
};

export const basketProductData = createSlice ({
  name: NameSpace.BasketProductList,
  initialState,
  reducers: {
    addProductToBasket: (state, action: PayloadAction<ProductItem>) => {
      if (!state.basketProductList.includes(action.payload)) {
        state.basketProductList.push(action.payload);
      }
    },
  },
  extraReducers: {}
});

export const {addProductToBasket} = basketProductData.actions;
