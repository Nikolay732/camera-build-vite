import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { createAPI } from '../../service/api';
import { extraActionsTypes, makeFakeProductList } from '../../mocks-for-test/mocks';
import { APIRoute } from '../../const';
import { fetchProductListAction } from './product-list-data-thunk';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ PRODUCT_LIST: { productList: [] } });
  });

  describe('fetchProductListAction', () => {
    it('should dispatch "fetchProductListAction.pending", "fetchProductListAction.fulfilled", when server response 200', async () => {
      const mockProductList = makeFakeProductList();
      mockAxiosAdapter.onGet(APIRoute.ProductList).reply(200, mockProductList);

      await store.dispatch(fetchProductListAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emittedActions);
      const fetchProductListActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchProductListAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchProductListAction.pending.type, fetchProductListAction.fulfilled.type]);

      expect(fetchProductListActionFulfilled.payload).toEqual(mockProductList);
    });

    it('should dispatch "fetchProductListAction.pending", "fetchProductListAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.ProductList).reply(400, []);

      await store.dispatch(fetchProductListAction());
      const actions = extraActionsTypes(store.getActions());

      expect(actions).toEqual([fetchProductListAction.pending.type, fetchProductListAction.rejected.type]);
    });
  });
});
