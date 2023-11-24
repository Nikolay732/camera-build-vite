import { BasketProduct } from '../../types/product';
import { basketProductData } from './basket-product-data-slice';

describe('CatalogProcess Slice', () => {
  type InitialState = {
    basketProductList: BasketProduct[];
  };
  const initialState: InitialState = {
    basketProductList: [],
  };

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {...initialState};

    const result = basketProductData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {...initialState};

    const result = basketProductData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
