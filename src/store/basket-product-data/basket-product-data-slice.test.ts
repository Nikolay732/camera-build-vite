import { CouponValue, Status } from '../../const';
import { CouponType } from '../../types/coupon';
import { BasketProduct, ProductItem } from '../../types/product';
import { basketProductData } from './basket-product-data-slice';
import { postCouponAction, postOrderAction } from './basket-product-data-thunk';

describe('BasketProductData Slice', () => {
  type InitialState = {
    basketProductList: BasketProduct[];
    isActiveModalRemoveItem: boolean;
    isActiveModalSuccess: boolean;
    deletedProduct: ProductItem | null;
    discount: number;
    promoCode: CouponType | null;
    isPromoCodeValid: boolean;
    status: Status;
    hasError: boolean;
  };
  const initialState: InitialState = {
    basketProductList: [],
    isActiveModalRemoveItem: false,
    isActiveModalSuccess: false,
    deletedProduct: null,
    discount: 0,
    promoCode: null,
    isPromoCodeValid: false,
    status: Status.Idle,
    hasError: false,
  };
  const emptyAction = {type: ''};

  it('should return initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = basketProductData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = basketProductData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should set hasError to "false" and isPromoCodeValid to "false" with "postCouponAction.pending"', () => {
    const state = {
      ...initialState,
      isPromoCodeValid: true,
      hasError: true,
    };

    const expectedState = {
      ...initialState,
      isPromoCodeValid: false,
      hasError: false,
    };

    const result = basketProductData.reducer(state, postCouponAction.pending);

    expect(result).toEqual(expectedState);
  });
  it('should set number of "discount", "isPromoCodeValid" to "true" with "postCouponAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      discount: 20,
      isPromoCodeValid: true,
    };
    const result = basketProductData
      .reducer(undefined, postCouponAction.fulfilled(20, '', CouponValue['camera-333']));
    expect(result).toEqual(expectedState);
  });
  it('should set "hasError" to "true" & "discount" to "0" with "postCouponAction.rejected', () => {
    const expectedState = {
      ...initialState,
      hasError: true,
      discount: 0
    };

    const result = basketProductData.reducer(undefined, postCouponAction.rejected);

    expect(result).toEqual(expectedState);
  });
  it('should set  status to "success" with "postOrderAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      status: Status.Success,
      isActiveModalSuccess: true,
    };

    const result = basketProductData.reducer(
      undefined, postOrderAction.fulfilled(10, '', {camerasIds: [1,2], coupon: CouponValue['camera-444']})
    );

    expect(result).toEqual(expectedState);
  });
  it('should set "status" to "error" with "postOrderAction.rejected', () => {
    const expectedState = {
      ...initialState,
      status: Status.Error,
      isActiveModalSuccess: true,
    };

    const result = basketProductData.reducer(undefined, postOrderAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
