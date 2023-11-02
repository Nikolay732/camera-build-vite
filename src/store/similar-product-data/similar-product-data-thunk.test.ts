import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { createAPI } from '../../service/api';
import { APIRoute } from '../../const';
import { AppThunkDispatch } from '../product-list-data/product-list-data-thunk.test';
import { extraActionsTypes, makeFakeProductItem, makeFakeSimilarProductList } from '../../mocks-for-test/mocks';
import { generatePath } from 'react-router-dom';
import { fetchSimilarProductListAction } from './similar-product-data-thunk';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ SIMILAR_PRODUCT_LIST: { similarProductList: [] } });
  });

  describe('fetchSimilarProductListAction', () => {
    const mockDetailedProduct = makeFakeProductItem();
    const mockSimilarProductList = makeFakeSimilarProductList();

    it('should dispatch "fetchSimilarProductListAction.pending", "fetchSimilarProductListAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter
        .onGet(generatePath(APIRoute.SimilarProductList, { cameraId: mockDetailedProduct.id.toString() }))
        .reply(200, mockSimilarProductList);

      await store.dispatch(fetchSimilarProductListAction(mockDetailedProduct.id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emittedActions);
      const fetchSimilarProductListActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchSimilarProductListAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarProductListAction.pending.type,
        fetchSimilarProductListAction.fulfilled.type,
      ]);

      expect(fetchSimilarProductListActionFulfilled.payload).toEqual(mockSimilarProductList);
    });

    it('should dispatch "fetchSimilarProductListAction.pending", "fetchSimilarProductListAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.SimilarProductList, { cameraId: mockDetailedProduct.id.toString() })).reply(400, []);

      await store.dispatch(fetchSimilarProductListAction(mockDetailedProduct.id.toString()));
      const actions = extraActionsTypes(store.getActions());

      expect(actions).toEqual([fetchSimilarProductListAction.pending.type, fetchSimilarProductListAction.rejected.type]);
    });
  });
});
