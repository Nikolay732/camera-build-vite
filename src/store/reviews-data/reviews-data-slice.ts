import { Review } from '../../types/review';
import { NameSpace } from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import { fetchReviewsListAction } from './reviews-data-thunk';

type InitialState = {
  reviews: Review[];
}

const initialState: InitialState = {
  reviews: [],
};

export const ReviewsData = createSlice ({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchReviewsListAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
