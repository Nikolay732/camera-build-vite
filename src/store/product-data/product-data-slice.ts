import { NameSpace } from '../../const';
import { ProductItem, PromoItem } from '../../types/product';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchProductListAction, fetchPromoListAction, fetchSelectedProductAction } from './product-data-thunk';

type InitialState = {
  productList: ProductItem[];
  promoList: PromoItem[];
  selectedPage: number;
  selectedProduct: ProductItem | null;
  isActiveModalAddItem: boolean;
};

const initialState: InitialState = {
  productList: [],
  promoList: [],
  selectedPage: 1,
  selectedProduct: null,
  isActiveModalAddItem: false,
};

export const ProductData = createSlice ({
  name: NameSpace.Product,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.selectedPage = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<ProductItem>) => {
      state.selectedProduct = action.payload;
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
      })
      .addCase(fetchSelectedProductAction.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  }
});

export const {setCurrentPage, setCurrentProduct, setIsActiveModalAddItem} = ProductData.actions;
