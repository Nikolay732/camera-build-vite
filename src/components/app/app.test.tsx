import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../mocks-for-test/mock-component';
import { App } from './app';
import { makeFakeStore } from '../../mocks-for-test/mocks';
import { AppRoute } from '../../const';
import {render, screen } from '@testing-library/react';
describe('Component: App', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "CatalogPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Catalog);

    render(withStoreComponent);

    const expectedText = 'Каталог фото- и видеотехники';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it ('should render "BacketPage" when user navigate to "/basket"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Basket);

    render(withStoreComponent);

    const expectedText = 'Корзина';
    expect(screen.getAllByText(expectedText).length).toBe(2);
  });

  it ('should render "NotFoundPage" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    const link: HTMLAnchorElement = screen.getByTestId('back-home');
    const expectedText = '404 Not Found';
    expect(link.href).toContain(AppRoute.Catalog);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
