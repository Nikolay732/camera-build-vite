import { makeFakeReviewList } from '../../mocks-for-test/mocks';
import { reviewsData } from './reviews-data-slice';
import { fetchReviewListAction, postReviewAction } from './reviews-data-thunk';

describe('ReviewsData Slice', () => {
  const emptyAction = {type: ''};
  const initialState = {
    reviewList: [],
    isReviewListLoading: false,
    hasErrorReviewList: false,
    isActiveModalReview: false,
    isPostReviewSuccess: false,
    currentRating: 0,
  };

  it('should return initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = reviewsData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const expectedState = {...initialState};

    const result = reviewsData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewListLoading" to "true", "hasError" to "false" with "fetchReviewListAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isReviewListLoading: true,
    };

    const result = reviewsData.reducer(undefined, fetchReviewListAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviewList" to array with review, "isReviewListLoading" to "false" with "fetchReviewListAction.fulfilled"', () => {
    const mockReviewList = makeFakeReviewList();
    const expectedState = {
      ...initialState,
      reviewList: [...mockReviewList],
    };

    const result = reviewsData.reducer(undefined, fetchReviewListAction.fulfilled(mockReviewList, '', 0));

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewListLoading" to "false", "hasError" to "true" with "fetchSimilarProductListAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      hasErrorReviewList: true,
    };

    const result = reviewsData.reducer(undefined, fetchReviewListAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should post new comment and add it to array with comments, "fetchReviewsAction" to "false" with "postReviewAction.fulfilled"', () => {
    const mockReviewList = makeFakeReviewList();
    const postReview = makeFakeReviewList()[0];
    const allReviewList = [...mockReviewList, postReview];

    const initialStatePost = {
      ...initialState,
      reviewList: mockReviewList,
    };

    const expectedState = {
      ...initialState,
      reviewList: allReviewList,
      isPostReviewSuccess: true,
    };

    const result = reviewsData.reducer(initialStatePost, {
      type: postReviewAction.fulfilled.type,
      payload: postReview,
    });

    expect(result).toEqual(expectedState);
  });
});
