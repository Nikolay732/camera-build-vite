import {createAsyncThunk} from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { Review } from '../../types/review';

export const fetchReviewsListAction = createAsyncThunk<Review[], string, ThunkAPI> (
  `${NameSpace.Reviews}/fetchReviewsList`,
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.ProductList}/${cameraId}/reviews`);
    return data;
  }
);
