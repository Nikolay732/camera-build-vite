import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getReviewList = (state: State) => state[NameSpace.ReviewList].reviewList;

export const getStatusReviewListLoading = (state: State) => state[NameSpace.ReviewList].isReviewListLoading;

export const getErrorStatusReviewList = (state: State) => state[NameSpace.ReviewList].hasErrorReviewList;

export const getStatusActiveModalReview = (state: State) => state[NameSpace.ReviewList].isActiveModalReview;

export const getStatusPostReviewSucces = (state: State) => state[NameSpace.ReviewList].isPostReviewSuccess;

export const getCurrentRating = (state: State) => state[NameSpace.ReviewList].currentRating;
