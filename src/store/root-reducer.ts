import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { ProductData } from './product-data/product-data-slice';
import { ReviewsData } from './reviews-data/reviews-data-slice';

export const rootReducer = combineReducers({
  [NameSpace.Product]: ProductData.reducer,
  [NameSpace.Reviews]: ReviewsData.reducer,
});
