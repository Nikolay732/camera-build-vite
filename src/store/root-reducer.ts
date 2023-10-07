import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { ProductData } from './product-data/product-data-slice';

export const rootReducer = combineReducers({
  [NameSpace.Product]: ProductData.reducer,
});
