import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { createAPI } from '../../service/api';
import { AppThunkDispatch } from '../product-list-data/product-list-data-thunk.test';
import { extraActionsTypes, makeFakePostReview, makeFakeProductItem, makeFakeReviewList } from '../../mocks-for-test/mocks';
import { generatePath } from 'react-router-dom';
import { APIRoute } from '../../const';
import { fetchReviewListAction, postReviewAction } from './reviews-data-thunk';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ PROMO_PRODUCT_LIST: { promoProductList: [] } });
  });

  describe('fetchReviewListAction', () => {
    const mockProductItem = makeFakeProductItem();
    const mockReviewList = makeFakeReviewList();

    it('should dispatch "fetchReviewListAction.pending", "fetchReviewListAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.ReviewList, {cameraId: mockProductItem.id.toString()})).reply(200, mockReviewList);

      await store.dispatch(fetchReviewListAction(mockProductItem.id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emittedActions);
      const fetchReviewListActionFullfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewListAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewListAction.pending.type,
        fetchReviewListAction.fulfilled.type,
      ]);

      expect(fetchReviewListActionFullfilled.payload).toEqual(mockReviewList);
    });
    it('should dispatch "fetchReviewListAction.pending", "fetchReviewListAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.ReviewList, {cameraId: mockProductItem.id.toString()})).reply(400, []);

      await store.dispatch(fetchReviewListAction(mockProductItem.id.toString()));
      const actions = extraActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewListAction.pending.type,
        fetchReviewListAction.rejected.type,
      ]);
    });
  });
  describe('postReviewListAction', () => {
    const mockPostReview = makeFakePostReview();

    it('should dispatch "postReviewAction.pending", "postReviewAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.ReviewPost, mockPostReview).reply(200, mockPostReview);

      await store.dispatch(postReviewAction(mockPostReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extraActionsTypes(emittedActions);
      const postReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof postReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);

      expect(postReviewActionFulfilled.payload).toEqual(mockPostReview);
    });

    it('should dispatch "postReviewAction.pending", "postReviewAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.ReviewPost, mockPostReview).reply(400, []);

      await store.dispatch(postReviewAction(mockPostReview));
      const actions = extraActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.rejected.type,
      ]);
    });
  });
});
