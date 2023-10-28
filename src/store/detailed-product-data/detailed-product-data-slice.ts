import { NameSpace } from '../../const';
import { ProductItem } from '../../types/product';
import {createSlice} from '@reduxjs/toolkit';
import { fetchDetailedProductAction } from './detailed-product-data-thunk';


type InitialState = {
  detailedProduct: ProductItem | null;
  isDetailedProductLoading: boolean;
  hasErrorDetailedProduct: boolean;
};

const initialState: InitialState = {
  detailedProduct: null,
  isDetailedProductLoading: true,
  hasErrorDetailedProduct: false,
};

export const detaildeProductData = createSlice ({
  name: NameSpace.ProductList,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchDetailedProductAction.fulfilled, (state, action) => {
        state.detailedProduct = action.payload;
        state.isDetailedProductLoading = false;
      })
      .addCase(fetchDetailedProductAction.pending, (state) => {
        state.isDetailedProductLoading = true;
      })
      .addCase(fetchDetailedProductAction.rejected, (state) => {
        state.isDetailedProductLoading = false;
        state.hasErrorDetailedProduct = true;
      });
  }
});

