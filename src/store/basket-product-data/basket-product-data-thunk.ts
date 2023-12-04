import { createAsyncThunk } from '@reduxjs/toolkit';
import { CouponType } from '../../types/coupon';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { Order } from '../../types/order';

export const postCouponAction = createAsyncThunk<number, CouponType,ThunkAPI> (
  `${NameSpace.BasketProductList}/ postCoupon`,
  async (coupon, {extra: api}) => {
    const {data} = await api.post<number>(APIRoute.Coupon, {coupon});
    return data;
  }
);

export const postOrderAction = createAsyncThunk<number,Order, ThunkAPI> (
  `${NameSpace.BasketProductList}/postOrder`,
  async ({camerasIds, coupon}, {extra: api}) => {
    const {data} = await api.post<number>(APIRoute.Order, {camerasIds, coupon});
    return data;
  }
);


