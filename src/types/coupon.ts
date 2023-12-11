import { CouponValue } from '../const';

export type Coupon = typeof CouponValue[keyof typeof CouponValue];
