import { CouponValue } from '../const';

export type Coupon = {
  coupon: CouponType;
}

export type CouponType = typeof CouponValue[keyof typeof CouponValue];
