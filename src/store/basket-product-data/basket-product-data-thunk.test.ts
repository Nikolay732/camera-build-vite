import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { createAPI } from '../../service/api';
import { extraActionsTypes } from '../../mocks-for-test/mocks';
import { APIRoute, CouponValue } from '../../const';
import { AppThunkDispatch } from '../product-list-data/product-list-data-thunk.test';
import { postCouponAction } from './basket-product-data-thunk';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ PRODUCT_LIST: { productList: [] } });
  });

  describe('postCouponAction', () => {
    it('should dispatch "postCouponAction.pending", "postCouponAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost(APIRoute.Coupon, {coupon: CouponValue['camera-333']}).reply(200,15);
      await store.dispatch(postCouponAction(CouponValue['camera-333']));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emittedActions);
      const postCouponActionFulfilled = emittedActions.at(1) as ReturnType<typeof postCouponAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postCouponAction.pending.type,
        postCouponAction.fulfilled.type,
      ]);

      expect(postCouponActionFulfilled.payload).toEqual(15);
    });
    it('should dispatch "postCouponAction.pending", "postCouponAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Coupon, {coupon: CouponValue['camera-333']}).reply(400, []);

      await store.dispatch(postCouponAction(CouponValue['camera-333']));
      const actions = extraActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCouponAction.pending.type,
        postCouponAction.rejected.type,
      ]);
    });
  });
});
