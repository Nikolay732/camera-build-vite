import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { AnyAction } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('shouldn\'t redirect to "/" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Catalog };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Catalog);
  });
});
