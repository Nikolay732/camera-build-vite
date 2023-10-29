import { makeFakeProductList } from '../../mocks-for-test/mocks';
import { productListData } from './product-list-data-slice';
import { fetchProductListAction } from './product-list-data-thunk';

describe('productListData Slice', () => {
  const emptyAction = {type: ''};
  const initialState = {
    productList: [],
    isProductListLoading: false,
    hasErrorProductList: false,
    currentPage: 1,
    selectedProduct: null,
    isActiveModalAddItem: false,
  };

  it('should return initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = productListData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = productListData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isProductListLoading" to "true", "hasError" to "false" with "fetchProductListAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isProductListLoading: true,
    };

    const result = productListData.reducer(undefined, fetchProductListAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "PromoProductList" to array with PromoProduct, "isProductListLoading" to "false" with "fetchProductListAction.fulfilled"', () => {
    const mockProductList = makeFakeProductList();
    const expectedState = {
      ...initialState,
      productList: [...mockProductList],
    };

    const result = productListData.reducer(undefined, fetchProductListAction.fulfilled(mockProductList, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "isProductListLoading" to "false", "hasError" to "true" with "fetchProductListAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      hasErrorProductList: true,
    };

    const result = productListData.reducer(undefined, fetchProductListAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
