import { NameSpace } from '../../const';
import { ProductItem, PromoItem } from '../../types/product';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchProductListAction, fetchPromoListAction, fetchDetailedProductAction, fetchSimilarProductListAction } from './product-data-thunk';

type InitialState = {
  productList: ProductItem[];
  promoList: PromoItem[];
  currentPage: number;
  detailedProduct: ProductItem | null;
  selectedProduct: ProductItem | null;
  isActiveModalAddItem: boolean;
  similarProductList: ProductItem[];
};

const initialState: InitialState = {
  productList: [],
  promoList: [],
  currentPage: 1,
  detailedProduct: null,
  selectedProduct: null,
  isActiveModalAddItem: false,
  similarProductList: [],
};

export const ProductData = createSlice ({
  name: NameSpace.Product,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<ProductItem>) => {
      state.selectedProduct = action.payload;
    },
    setActiveModalAddItemStatus: (state, action: PayloadAction<boolean>) => {
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
      .addCase(fetchDetailedProductAction.fulfilled, (state, action) => {
        state.detailedProduct = action.payload;
      })
      .addCase(fetchSimilarProductListAction.fulfilled, (state, action) => {
        state.similarProductList = action.payload;
      });
  }
});

export const {setCurrentPage, setSelectedProduct, setActiveModalAddItemStatus} = ProductData.actions;
