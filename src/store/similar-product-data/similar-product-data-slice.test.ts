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
});
