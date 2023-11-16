import { NameSpace, SortOrder, SortType } from '../../const';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
  sortType: SortType | null;
  sortOrder: SortOrder | null;
};

const initialState: InitialState = {
  sortType: null,
  sortOrder: null,
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
  },
  extraReducers: {}
});

export const {setSortOrder, setSortType} = catalogProcess.actions;
