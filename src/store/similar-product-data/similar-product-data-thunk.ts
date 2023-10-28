import {createAsyncThunk} from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { ProductItem} from '../../types/product';


export const fetchSimilarProductListAction = createAsyncThunk<ProductItem[], number, ThunkAPI> (
  `${NameSpace.SimilarProductList}/fetchSimilarProductList`,
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<ProductItem[]>(`${APIRoute.ProductList}/${cameraId}/similar`);
    return data;
  }
);
