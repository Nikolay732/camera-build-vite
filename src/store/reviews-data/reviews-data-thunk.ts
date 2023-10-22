import {createAsyncThunk} from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { PostReview, Review } from '../../types/review';

export const fetchReviewsListAction = createAsyncThunk<Review[], number, ThunkAPI> (
  `${NameSpace.Reviews}/fetchReviewsList`,
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.ProductList}/${cameraId}/reviews`);
    return data;
  }
);

export const postReviewAction = createAsyncThunk<Review, PostReview, ThunkAPI> (
  `${NameSpace.Reviews}/postReview`,
  async (review, {extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.ReviewPost}`, review);
    return data;
  }
);
