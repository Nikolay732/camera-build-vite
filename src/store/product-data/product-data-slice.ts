import { NameSpace } from '../../const';
import { ProductItem, PromoItem } from '../../types/product';
import {createSlice} from '@reduxjs/toolkit';
import { fetchProductListAction, fetchPromoListAction } from './product-data-thunk';

type InitialState = {
  ProductList: ProductItem[];
  PromoList: PromoItem[];
};

const initialState: InitialState = {
  ProductList: [],
  PromoList: [],
};

export const ProductData = createSlice ({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchProductListAction.fulfilled, (state, action) => {
        state.ProductList = action.payload;
      })
      .addCase(fetchPromoListAction.fulfilled, (state, action) => {
        state.PromoList = action.payload;
      });
  }
});


