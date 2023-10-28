import {createAsyncThunk} from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { PromoItem } from '../../types/product';

export const fetchPromoProductListAction = createAsyncThunk<PromoItem[], undefined, ThunkAPI> (
  `${NameSpace.PromoProductList}/fetchPromoProductList`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoItem[]>(APIRoute.PromoList);
    return data;
  },
);
