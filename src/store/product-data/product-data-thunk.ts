import {createAsyncThunk} from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { ProductItem } from '../../types/product';

export const fetchProductListAction = createAsyncThunk<ProductItem[], undefined, ThunkAPI> (
  `${NameSpace.Product}/fetchProductList`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ProductItem[]>(APIRoute.ProductList);
    return data;
  },
);

