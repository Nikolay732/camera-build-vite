import { CouponType } from './coupon';

export type Order = {
  camerasIds: number[];
  coupon: CouponType | null;
};
