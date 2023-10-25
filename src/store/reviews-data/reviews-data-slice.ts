import { Review } from '../../types/review';
import { NameSpace } from '../../const';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchReviewsListAction, postReviewAction } from './reviews-data-thunk';

type InitialState = {
  reviews: Review[];
  isActiveModalReview: boolean;
  isActiveModalReviewSuccess: boolean;
  currentRating: number;
}

const initialState: InitialState = {
  reviews: [],
  isActiveModalReview: false,
  isActiveModalReviewSuccess: false,
  currentRating: 0,
};

export const ReviewsData = createSlice ({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setActiveModalReviewStatus: (state, action: PayloadAction<boolean>) => {
      state.isActiveModalReview = action.payload;
    },
    setActiveModalReviewSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.isActiveModalReviewSuccess = action.payload;
    },
    setCurrentRating: (state, action: PayloadAction<number>) => {
      state.currentRating = action.payload;
    },
  },
  extraReducers (builder) {
    builder
      .addCase(fetchReviewsListAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  }
});

export const {setActiveModalReviewStatus, setActiveModalReviewSuccessStatus, setCurrentRating} = ReviewsData.actions;
