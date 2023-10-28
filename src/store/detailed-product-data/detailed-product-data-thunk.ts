import {createAsyncThunk} from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { ProductItem} from '../../types/product';

export const fetchDetailedProductAction = createAsyncThunk<ProductItem, number, ThunkAPI> (
  `${NameSpace.ProductList}/fetchSelectedProduct`,
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<ProductItem>(`${APIRoute.ProductList}/${cameraId}`);
    return data;
  }
);
