import { NameSpace } from '../../const';
import { ProductItem } from '../../types/product';
import { createSlice } from '@reduxjs/toolkit';
import { fetchProductListAction } from './product-list-data-thunk';

type InitialState = {
  productList: ProductItem[];
  isProductListLoading: boolean;
  hasErrorProductList: boolean;
};

const initialState: InitialState = {
  productList: [],
  isProductListLoading: false,
  hasErrorProductList: false,
};

export const productListData = createSlice ({
  name: NameSpace.ProductList,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchProductListAction.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.isProductListLoading = false;
      })
      .addCase(fetchProductListAction.pending, (state) => {
        state.isProductListLoading = true;
        state.hasErrorProductList = false;
      })
      .addCase(fetchProductListAction.rejected, (state) => {
        state.isProductListLoading = false;
        state.hasErrorProductList = true;
      });
  }
});
