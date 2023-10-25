import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getReviewsList = (state: State) => state[NameSpace.Reviews].reviews;

export const getStatusActiveModalReview = (state: State) => state[NameSpace.Reviews].isActiveModalReview;

export const getStatusActiveModalReviewSucces = (state: State) => state[NameSpace.Reviews].isActiveModalReviewSuccess;

export const getCurrentRating = (state: State) => state[NameSpace.Reviews].currentRating;
