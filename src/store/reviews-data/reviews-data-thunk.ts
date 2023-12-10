import {createAsyncThunk} from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { PostReview, Review } from '../../types/review';
import { generatePath } from 'react-router-dom';

export const fetchReviewListAction = createAsyncThunk<Review[], string, ThunkAPI> (
  `${NameSpace.ReviewList}/fetchReviewList`,
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<Review[]>(generatePath(APIRoute.ReviewList, {cameraId: cameraId}));
    return data;
  }
);

export const postReviewAction = createAsyncThunk<Review, PostReview, ThunkAPI> (
  `${NameSpace.ReviewList}/postReview`,
  async (review, {extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.ReviewPost}`, review);
    return data;
  }
);
