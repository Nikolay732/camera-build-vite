import { makeFakeProductItem } from '../../mocks-for-test/mocks';
import { detaildeProductData } from './detailed-product-data-slice';
import { fetchDetailedProductAction } from './detailed-product-data-thunk';

describe('detailedProductData Slice', () => {
  const emptyAction = {type: ''};
  const initialState = {
    detailedProduct: null,
    isDetailedProductLoading: false,
    hasErrorDetailedProduct: false,
  };

  it('should return initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = detaildeProductData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = detaildeProductData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isDetailedProductLoading" to "true", "hasError" to "false" with "fetchDetailedProductAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isDetailedProductLoading: true,
    };

    const result = detaildeProductData.reducer(undefined, fetchDetailedProductAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "detailedProduct" to array with detailedProduct, "isDetailedProductLoading" to "false" with "fetchDetailedProductAction.fulfilled"', () => {
    const mockDetaildeProduct = makeFakeProductItem();
    const expectedState = {
      ...initialState,
      detailedProduct: mockDetaildeProduct,
    };

    const result = detaildeProductData.reducer(undefined, fetchDetailedProductAction.fulfilled(mockDetaildeProduct, '', 0));

    expect(result).toEqual(expectedState);
  });

  it('should set "isDetailedProductLoading" to "false", "hasError" to "true" with "fetchDetailedProductAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      hasErrorDetailedProduct: true,
    };

    const result = detaildeProductData.reducer(undefined, fetchDetailedProductAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
