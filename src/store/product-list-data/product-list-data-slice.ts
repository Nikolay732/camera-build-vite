import { NameSpace } from '../../const';
import { ProductItem } from '../../types/product';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchProductListAction } from './product-list-data-thunk';

type InitialState = {
  productList: ProductItem[];
  isProductListLoading: boolean;
  hasErrorProductList: boolean;
  currentPage: number;
  selectedProduct: ProductItem | null;
  isActiveModalAddItem: boolean;
  isActiveModalAddItemSuccess: boolean;
};

const initialState: InitialState = {
  productList: [],
  isProductListLoading: false,
  hasErrorProductList: false,
  currentPage: 1,
  selectedProduct: null,
  isActiveModalAddItem: false,
  isActiveModalAddItemSuccess: false
};

export const productListData = createSlice ({
  name: NameSpace.ProductList,
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
    setActiveModalAddItemSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.isActiveModalAddItemSuccess = action.payload;
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
        state.hasErrorProductList = false;
      })
      .addCase(fetchProductListAction.rejected, (state) => {
        state.isProductListLoading = false;
        state.hasErrorProductList = true;
      });
  }
});

export const {setCurrentPage, setSelectedProduct, setActiveModalAddItemStatus, setActiveModalAddItemSuccessStatus} = productListData.actions;
