import { NameSpace, SortOrder, SortType } from '../../const';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ProductCategory, ProductLevel, ProductType } from '../../types/product';

type InitialState = {
  sortType: SortType | null;
  sortOrder: SortOrder | null;
  category: ProductCategory | null;
  type: ProductType[];
  level: ProductLevel[];
  minPrice: number;
  maxPrice: number;
  isReset: boolean;
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
    setFilterCategory: (state, action: PayloadAction<ProductCategory>) => {
      state.category = action.payload;
    },
    setFilterType: (state, action: PayloadAction<ProductType>) => {
      if (!state.type.includes(action.payload)) {
        state.type.push(action.payload);
      } else {
        state.type = state.type.filter((type) => type !== action.payload);
      }
    },
    setFilterLevel: (state, action: PayloadAction<ProductLevel>) => {
      if (!state.level.includes(action.payload)) {
        state.level.push(action.payload);
      } else {
        state.level = state.level.filter((level) => level !== action.payload);
      }
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
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
    },
    setResetStatus:(state, action: PayloadAction<boolean>) => {
      state.isReset = action.payload;
    }
  },
  extraReducers: {}
});

export const {setSortOrder, setSortType, setFilterCategory, setFilterType, setFilterLevel, setMinPrice, setMaxPrice, resetFilters, setResetStatus} = catalogProcess.actions;
