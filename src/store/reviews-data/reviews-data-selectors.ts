import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getReviewsList = (state: State) => state[NameSpace.Reviews].reviews;

