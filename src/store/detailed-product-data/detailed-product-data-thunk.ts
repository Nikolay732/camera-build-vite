import {createAsyncThunk} from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { ProductItem} from '../../types/product';
import { generatePath } from 'react-router-dom';

export const fetchDetailedProductAction = createAsyncThunk<ProductItem, string, ThunkAPI> (
  `${NameSpace.ProductList}/fetchSelectedProduct`,
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<ProductItem>(generatePath(APIRoute.DetailedProduct, {cameraId: cameraId}));
    return data;
  }
);
