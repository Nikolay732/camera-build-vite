import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getReviewsList = (state: State) => state[NameSpace.Reviews].reviews;

export const getStatusActiveModalReview = (state: State) => state[NameSpace.Reviews].isActiveModalReview;
