import { makeFakePromoProductList } from '../../mocks-for-test/mocks';
import { promoProductData } from './promo-product-data-slice';
import { fetchPromoProductListAction } from './promo-product-data-thunk';

describe('promoProductListData Slice', () => {
  const emptyAction = {type: ''};
  const initialState = {
    promoProductList: [],
    isPromoProductListLoading: false,
    hasErrorPromoProductList: false,
  };

  it('should return initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = promoProductData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = promoProductData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isPromoProductListLoading" to "true", "hasError" to "false" with "fetchPromoProductListAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isPromoProductListLoading: true,
    };

    const result = promoProductData.reducer(undefined, fetchPromoProductListAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "PromoProductList" to array with PromoProduct, "isPromoProductListLoading" to "false" with "fetchPromoProductListAction.fulfilled"', () => {
    const mockPromoProductList = makeFakePromoProductList();
    const expectedState = {
      ...initialState,
      promoProductList: [...mockPromoProductList],
    };

    const result = promoProductData.reducer(undefined, fetchPromoProductListAction.fulfilled(mockPromoProductList, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "isPromoProductListLoading" to "false", "hasError" to "true" with "fetchPromoProductListAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      hasErrorPromoProductList: true,
    };

    const result = promoProductData.reducer(undefined, fetchPromoProductListAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
