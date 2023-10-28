import { NameSpace } from '../../const';
import { PromoItem } from '../../types/product';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPromoProductListAction } from './promo-product-data-thunk';

type InitialState = {
  promoProductList: PromoItem[];
  isPromoProductListLoading: boolean;
  hasErrorPromoProductList: boolean;
};

const initialState: InitialState = {
  promoProductList: [],
  isPromoProductListLoading: false,
  hasErrorPromoProductList: false,
};

export const promoProductData = createSlice ({
  name: NameSpace.ProductList,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchPromoProductListAction.fulfilled, (state, action) => {
        state.promoProductList = action.payload;
        state.isPromoProductListLoading = false;
      })
      .addCase(fetchPromoProductListAction.pending, (state) => {
        state.isPromoProductListLoading = true;
        state.hasErrorPromoProductList = false;
      })
      .addCase(fetchPromoProductListAction.rejected, (state) => {
        state.isPromoProductListLoading = false;
        state.hasErrorPromoProductList = true;
      });
  }
});

