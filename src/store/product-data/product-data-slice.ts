import { NameSpace } from '../../const';
import { ProductItem, PromoItem } from '../../types/product';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchProductListAction, fetchPromoListAction, fetchDetailedProductAction, fetchSimilarProductListAction } from './product-data-thunk';

type InitialState = {
  productList: ProductItem[];
  isProductListLoading: boolean;
  hasErrorProductList: boolean;
  promoList: PromoItem[];
  isPromoListLoading: boolean;
  hasErrorPromoList: boolean;
  currentPage: number;
  detailedProduct: ProductItem | null;
  isDetailedProductLoading: boolean;
  hasErrorDetailedProduct: boolean;
  selectedProduct: ProductItem | null;
  isActiveModalAddItem: boolean;
  similarProductList: ProductItem[];
  isSimilarProductListLoading: boolean;
  hasErrorSimilarProductList: boolean;
};

const initialState: InitialState = {
  productList: [],
  isProductListLoading: true,
  hasErrorProductList: false,
  promoList: [],
  isPromoListLoading: true,
  hasErrorPromoList: false,
  currentPage: 1,
  detailedProduct: null,
  isDetailedProductLoading: true,
  hasErrorDetailedProduct: false,
  selectedProduct: null,
  isActiveModalAddItem: false,
  similarProductList: [],
  isSimilarProductListLoading: true,
  hasErrorSimilarProductList: false,
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
        state.isProductListLoading = false;
      })
      .addCase(fetchProductListAction.pending, (state) => {
        state.isProductListLoading = true;
      })
      .addCase(fetchProductListAction.rejected, (state) => {
        state.isProductListLoading = false;
        state.hasErrorProductList = true;
      })
      .addCase(fetchPromoListAction.fulfilled, (state, action) => {
        state.promoList = action.payload;
        state.isPromoListLoading = false;
      })
      .addCase(fetchPromoListAction.pending, (state) => {
        state.isPromoListLoading = true;
      })
      .addCase(fetchPromoListAction.rejected, (state) => {
        state.isPromoListLoading = false;
        state.hasErrorPromoList = true;
      })
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
      })
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

export const {setCurrentPage, setSelectedProduct, setActiveModalAddItemStatus} = ProductData.actions;
