import { Review } from '../../types/review';
import { NameSpace } from '../../const';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchReviewsListAction } from './reviews-data-thunk';

type InitialState = {
  reviews: Review[];
  isActiveModalReview: boolean;
  currentRating: string;
}

const initialState: InitialState = {
  reviews: [],
  isActiveModalReview: false,
  currentRating: '',
};

export const ReviewsData = createSlice ({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setActiveModalReviewStatus: (state, action: PayloadAction<boolean>) => {
      state.isActiveModalReview = action.payload;
    },
    setCurrentRating: (state, action: PayloadAction<string>) => {
      state.currentRating = action.payload;
    },
  },
  extraReducers (builder) {
    builder
      .addCase(fetchReviewsListAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});

export const {setActiveModalReviewStatus, setCurrentRating} = ReviewsData.actions;
