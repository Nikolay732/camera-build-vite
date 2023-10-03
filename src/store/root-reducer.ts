import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasData } from './cameras-data/cameras-data-slice';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasData.reducer,
});
