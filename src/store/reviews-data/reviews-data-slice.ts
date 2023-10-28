import { Review } from '../../types/review';
import { NameSpace } from '../../const';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchReviewListAction, postReviewAction } from './reviews-data-thunk';

type InitialState = {
  reviewList: Review[];
  isReviewListLoading: boolean;
  hasErrorReviewList: boolean;
  isActiveModalReview: boolean;
  isPostReviewSuccess: boolean;
  currentRating: number;
}

const initialState: InitialState = {
  reviewList: [],
  isReviewListLoading: false,
  hasErrorReviewList: false,
  isActiveModalReview: false,
  isPostReviewSuccess: false,
  currentRating: 0,
};

export const reviewsData = createSlice ({
  name: NameSpace.ReviewList,
  initialState,
  reducers: {
    setStatusActiveModalReview: (state, action: PayloadAction<boolean>) => {
      state.isActiveModalReview = action.payload;
    },
    setStatusPostReviewSuccess: (state, action: PayloadAction<boolean>) => {
      state.isPostReviewSuccess = action.payload;
    },
    setCurrentRating: (state, action: PayloadAction<number>) => {
      state.currentRating = action.payload;
    },
  },
  extraReducers (builder) {
    builder
      .addCase(fetchReviewListAction.fulfilled, (state, action) => {
        state.reviewList = action.payload;
        state.isReviewListLoading = false;
      })
      .addCase(fetchReviewListAction.pending, (state) => {
        state.isReviewListLoading = true;
        state.hasErrorReviewList = false;
      })
      .addCase(fetchReviewListAction.rejected, (state) => {
        state.isReviewListLoading = false;
        state.hasErrorReviewList = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviewList.push(action.payload);
        state.isPostReviewSuccess = true;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isPostReviewSuccess = false;
      });
  }
});

export const {setStatusActiveModalReview, setStatusPostReviewSuccess, setCurrentRating} = reviewsData.actions;
