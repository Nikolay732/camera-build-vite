import { NameSpace } from '../../const';
import { ProductItem, PromoItem } from '../../types/product';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchProductListAction, fetchPromoListAction } from './product-data-thunk';

type InitialState = {
  productList: ProductItem[];
  promoList: PromoItem[];
  currentPage: number;
  currentProduct: ProductItem | null;
  isActiveModalAddItem: boolean;
};

const initialState: InitialState = {
  productList: [],
  promoList: [],
  currentPage: 1,
  currentProduct: null,
  isActiveModalAddItem: false,
};

export const ProductData = createSlice ({
  name: NameSpace.Product,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<ProductItem>) => {
      state.currentProduct = action.payload;
    },
    setIsActiveModalAddItem: (state, action: PayloadAction<boolean>) => {
      state.isActiveModalAddItem = action.payload;
    },
  },
  extraReducers (builder) {
    builder
      .addCase(fetchProductListAction.fulfilled, (state, action) => {
        state.productList = action.payload;
      })
      .addCase(fetchPromoListAction.fulfilled, (state, action) => {
        state.promoList = action.payload;
      });
  }
});

export const {setCurrentPage, setCurrentProduct, setIsActiveModalAddItem} = ProductData.actions;
