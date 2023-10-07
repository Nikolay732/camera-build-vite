import { NameSpace } from '../../const';
import { ProductItem } from '../../types/product';
import {createSlice} from '@reduxjs/toolkit';
import { fetchProductListAction } from './product-data-thunk';

type InitialState = {
  ProductList: ProductItem[];
};

const initialState: InitialState = {
  ProductList: [],
};

export const ProductData = createSlice ({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchProductListAction.fulfilled, (state, action) => {
        state.ProductList = action.payload;
      });
  }
});


