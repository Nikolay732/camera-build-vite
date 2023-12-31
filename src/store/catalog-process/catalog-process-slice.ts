import { NameSpace, SortOrder, SortType } from '../../const';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ProductCategory, ProductItem, ProductLevel, ProductType } from '../../types/product';

type InitialState = {
  sortType: SortType | null;
  sortOrder: SortOrder | null;
  category: ProductCategory | null;
  type: ProductType[];
  level: ProductLevel[];
  minPrice: number;
  maxPrice: number;
  isReset: boolean;
  currentPage: number;
  selectedProduct: ProductItem | null;
  isActiveModalAddItem: boolean;
  isActiveModalAddItemSuccess: boolean;
};

const initialState: InitialState = {
  sortType: null,
  sortOrder: null,
  category: null,
  type: [],
  level: [],
  minPrice: 0,
  maxPrice: 0,
  isReset: false,
  currentPage: 1,
  selectedProduct: null,
  isActiveModalAddItem: false,
  isActiveModalAddItemSuccess: false
};

export const catalogProcess = createSlice ({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
      if (!state.sortOrder) {
        state.sortOrder = SortOrder.Up;
      }
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
      if (!state.sortType) {
        state.sortType = SortType.Price;
      }
    },
    setFilterCategory: (state, action: PayloadAction<ProductCategory | null>) => {
      state.category = action.payload;
      state.currentPage = 1;
    },
    setFilterType: (state, action: PayloadAction<ProductType>) => {
      if (!state.type.includes(action.payload)) {
        state.type.push(action.payload);
      } else {
        state.type = state.type.filter((type) => type !== action.payload);
      }
      state.currentPage = 1;
    },
    setFilterLevel: (state, action: PayloadAction<ProductLevel>) => {
      if (!state.level.includes(action.payload)) {
        state.level.push(action.payload);
      } else {
        state.level = state.level.filter((level) => level !== action.payload);
      }
      state.currentPage = 1;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
      state.currentPage = 1;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
      state.currentPage = 1;
    },
    resetFilters: (state) => {
      state.sortType = null;
      state.sortOrder = null;
      state.category = null;
      state.type = [];
      state.level = [];
      state.minPrice = 0;
      state.maxPrice = 0;
      state.isReset = true;
      state.currentPage = 1;
    },
    setResetStatus:(state, action: PayloadAction<boolean>) => {
      state.isReset = action.payload;
    },
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
  extraReducers: {}
});

export const {
  setSortOrder,
  setSortType,
  setFilterCategory,
  setFilterType,
  setFilterLevel,
  setMinPrice,
  setMaxPrice,
  resetFilters,
  setResetStatus,
  setCurrentPage,
  setSelectedProduct,
  setActiveModalAddItemStatus,
  setActiveModalAddItemSuccessStatus
} = catalogProcess.actions;
