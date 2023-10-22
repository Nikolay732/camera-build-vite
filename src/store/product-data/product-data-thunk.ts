import {createAsyncThunk} from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { ProductItem, PromoItem } from '../../types/product';

export const fetchProductListAction = createAsyncThunk<ProductItem[], undefined, ThunkAPI> (
  `${NameSpace.Product}/fetchProductList`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ProductItem[]>(APIRoute.ProductList);
    return data;
  },
);

export const fetchPromoListAction = createAsyncThunk<PromoItem[], undefined, ThunkAPI> (
  `${NameSpace.Product}/fetchPromoList`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoItem[]>(APIRoute.PromoList);
    return data;
  },
);

export const fetchDetailedProductAction = createAsyncThunk<ProductItem, number, ThunkAPI> (
  `${NameSpace.Product}/fetchSelectedProduct`,
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<ProductItem>(`${APIRoute.ProductList}/${cameraId}`);
    return data;
  }
);

export const fetchSimilarProductListAction = createAsyncThunk<ProductItem[], number, ThunkAPI> (
  `${NameSpace.Product}/fetchSimilarProductList`,
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<ProductItem[]>(`${APIRoute.ProductList}/${cameraId}/similar`);
    return data;
  }
);

