import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { createAPI } from '../../service/api';
import { APIRoute } from '../../const';
import { AppThunkDispatch } from '../product-list-data/product-list-data-thunk.test';
import { extraActionsTypes, makeFakePromoProductList } from '../../mocks-for-test/mocks';
import { fetchPromoProductListAction } from './promo-product-data-thunk';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ PROMO_PRODUCT_LIST: { promoProductList: [] } });
  });

  describe('fetchPromoProductAction', () => {
    it('should dispatch "fetchPromoProductListAction.pending", "fetchPromoProductListAction.fulfilled", when server response 200', async () => {
      const mockPromoProductList = makeFakePromoProductList();
      mockAxiosAdapter.onGet(APIRoute.PromoList).reply(200, mockPromoProductList);

      await store.dispatch(fetchPromoProductListAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emittedActions);
      const fetchPromoProductListActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoProductListAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchPromoProductListAction.pending.type, fetchPromoProductListAction.fulfilled.type]);

      expect(fetchPromoProductListActionFulfilled.payload).toEqual(mockPromoProductList);
    });

    it('should dispatch "fetchPromoProductListAction.pending", "fetchPromoProductListAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.PromoList).reply(400, []);

      await store.dispatch(fetchPromoProductListAction());
      const actions = extraActionsTypes(store.getActions());

      expect(actions).toEqual([fetchPromoProductListAction.pending.type, fetchPromoProductListAction.rejected.type]);
    });
  });
});
