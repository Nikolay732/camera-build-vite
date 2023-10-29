import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { generatePath } from 'react-router-dom';
import { createAPI } from '../../service/api';
import { extraActionsTypes, makeFakeProductItem } from '../../mocks-for-test/mocks';
import { APIRoute } from '../../const';
import { fetchDetailedProductAction } from './detailed-product-data-thunk';
import { AppThunkDispatch } from '../product-list-data/product-list-data-thunk.test';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ PRODUCT_LIST: { productList: [] } });
  });

  describe('fetchDetailedProductAction', () => {
    const mockDetailedProduct = makeFakeProductItem();
    it('should dispatch "fetchDetaildeProductAction.pending", "fetchDetailedProductAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter
        .onGet(generatePath(APIRoute.DetailedProduct, { cameraId: mockDetailedProduct.id.toString() }))
        .reply(200, mockDetailedProduct);

      await store.dispatch(fetchDetailedProductAction(mockDetailedProduct.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emittedActions);
      const fetchDetailedProductActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchDetailedProductAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchDetailedProductAction.pending.type, fetchDetailedProductAction.fulfilled.type]);

      expect(fetchDetailedProductActionFulfilled.payload).toEqual(mockDetailedProduct);
    });

    it('should dispatch "fetchDetailedProductAction.pending", "fetchDetailedProductAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.DetailedProduct, { cameraId: mockDetailedProduct.id.toString() })).reply(400, []);

      await store.dispatch(fetchDetailedProductAction(mockDetailedProduct.id));
      const actions = extraActionsTypes(store.getActions());

      expect(actions).toEqual([fetchDetailedProductAction.pending.type, fetchDetailedProductAction.rejected.type]);
    });
  });
});
