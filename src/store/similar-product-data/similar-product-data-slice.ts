import { NameSpace } from '../../const';
import { ProductItem} from '../../types/product';
import {createSlice} from '@reduxjs/toolkit';
import { fetchSimilarProductListAction } from './similar-product-data-thunk';


type InitialState = {
  similarProductList: ProductItem[];
  isSimilarProductListLoading: boolean;
  hasErrorSimilarProductList: boolean;
};

const initialState: InitialState = {
  similarProductList: [],
  isSimilarProductListLoading: true,
  hasErrorSimilarProductList: false,
};

export const similarProductData = createSlice ({
  name: NameSpace.ProductList,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchSimilarProductListAction.fulfilled, (state, action) => {
        state.similarProductList = action.payload;
        state.isSimilarProductListLoading = false;
      })
      .addCase(fetchSimilarProductListAction.pending, (state) => {
        state.isSimilarProductListLoading = true;
      })
      .addCase(fetchSimilarProductListAction.rejected, (state) => {
        state.isSimilarProductListLoading = false;
        state.hasErrorSimilarProductList = true;
      });
  }
});
