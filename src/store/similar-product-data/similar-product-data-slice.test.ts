import { makeFakeSimilarProductList } from '../../mocks-for-test/mocks';
import { similarProductData } from './similar-product-data-slice';
import { fetchSimilarProductListAction } from './similar-product-data-thunk';

describe('SimilarProductData Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      similarProductList: [],
      isSimilarProductListLoading: false,
      hasErrorSimilarProductList: false,
    };

    const result = similarProductData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      similarProductList: [],
      isSimilarProductListLoading: false,
      hasErrorSimilarProductList: false,
    };

    const result = similarProductData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isSimilarProductListLoading" to "true", "hasError" to "false" with "fetchSimilarProductListAction.pending"', () => {
    const expectedState = {
      similarProductList: [],
      isSimilarProductListLoading: true,
      hasErrorSimilarProductList: false,
    };

    const result = similarProductData.reducer(undefined, fetchSimilarProductListAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "similarProductList" to array with similarProduct, "isSimilarProductListLoading" to "false" with "fetchSimilarProductListAction.fulfilled"', () => {
    const mockSimilarProductList = makeFakeSimilarProductList();
    const expectedState = {
      similarProductList: [...mockSimilarProductList],
      isSimilarProductListLoading: false,
      hasErrorSimilarProductList: false,
    };

    const result = similarProductData.reducer(undefined, fetchSimilarProductListAction.fulfilled(mockSimilarProductList, '', 0));

    expect(result).toEqual(expectedState);
  });

  it('should set "isSimilarProductListLoading" to "false", "hasError" to "true" with "fetchSimilarProductListAction.rejected"', () => {
    const expectedState = {
      similarProductList: [],
      isSimilarProductListLoading: false,
      hasErrorSimilarProductList: true,
    };

    const result = similarProductData.reducer(undefined, fetchSimilarProductListAction.rejected);

    expect(result).toEqual(expectedState);
  });

});
