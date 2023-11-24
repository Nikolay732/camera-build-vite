import { ProductCategoryValue, ProductLevelValue, ProductTypeValue, SortOrder, SortType } from '../../const';
import { ProductCategory, ProductItem, ProductLevel, ProductType } from '../../types/product';
import { catalogProcess, resetFilters, setSortOrder, setSortType } from './catalog-process-slice';

describe('CatalogProcess Slice', () => {
  const emptyAction = {type: ''};
  type InitialState = {
    sortType: SortType | null;
    sortOrder: SortOrder | null;
    category: ProductCategory | null;
    type: ProductType[];
    level: ProductLevel[];
    minPrice: number;
    maxPrice: number;
    isReset: boolean;
    currentPage: number;
    selectedProduct: ProductItem | null;
    isActiveModalAddItem: boolean;
    isActiveModalAddItemSuccess: boolean;
  };

  const initialState: InitialState = {
    sortType: null,
    sortOrder: null,
    category: null,
    type: [],
    level: [],
    minPrice: 0,
    maxPrice: 0,
    isReset: false,
    currentPage: 1,
    selectedProduct: null,
    isActiveModalAddItem: false,
    isActiveModalAddItemSuccess: false
  };

  it('should return initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = catalogProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const expectedState = {...initialState};

    const result = catalogProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it ('should reset filters with "resetFilters" action', () => {
    const state = {
      ...initialState,
      sortType: SortType.Price,
      sortOrder: SortOrder.Up,
      category: ProductCategoryValue.VideoCamera,
      type: [ProductTypeValue.Collection, ProductTypeValue.Digital],
      level: [ProductLevelValue.Professional, ProductLevelValue.Zero],
      minPrice: 5000,
      maxPrice: 150000,
    };
    const expectedState = {
      ...initialState,
      isReset: true,
    };

    const result = catalogProcess.reducer(state, resetFilters);

    expect(result).toEqual(expectedState);
  });

  it ('should set sort order to "Up" when sortType action is used, if there is no sort order', () => {
    const expectedState = {
      ...initialState,
      sortType: SortType.Price,
      sortOrder: SortOrder.Up,
    };

    const result = catalogProcess.reducer(undefined, setSortType(SortType.Price));

    expect(result).toEqual(expectedState);
  });

  it ('should set sort type to "Price" when sortOrder action is used, if there is no sort type', () => {
    const expectedState = {
      ...initialState,
      sortType: SortType.Price,
      sortOrder: SortOrder.Down,
    };

    const result = catalogProcess.reducer(undefined, setSortOrder(SortOrder.Down));

    expect(result).toEqual(expectedState);
  });
});
