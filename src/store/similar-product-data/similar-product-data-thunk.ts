import {createAsyncThunk} from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { ProductItem} from '../../types/product';
import { generatePath } from 'react-router-dom';


export const fetchSimilarProductListAction = createAsyncThunk<ProductItem[], string, ThunkAPI> (
  `${NameSpace.SimilarProductList}/fetchSimilarProductList`,
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<ProductItem[]>(generatePath(APIRoute.SimilarProductList, {cameraId: cameraId}));
    return data;
  }
);
