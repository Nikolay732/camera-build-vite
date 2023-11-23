import { withHistory, withStore } from '../../mocks-for-test/mock-component';
import {render, screen } from '@testing-library/react';
import { Breadcrumbs } from './breadcrumbs';
import { AppRoute } from '../../const';
import { makeFakeProductItem } from '../../mocks-for-test/mocks';

describe('Component: Breadcrumbs', () => {
  const expectedText = 'Главная';
  const expectedText2 = 'Каталог';
  const detailedProduct = makeFakeProductItem();

  it ('should render correctly with CatalogPage', () => {
    const {withStoreComponent} = withStore(<Breadcrumbs isCatalogPage/>, {
      DETAILED_PRODUCT: {
        detailedProduct: detailedProduct,
        isDetailedProductLoading: false,
        hasErrorDetailedProduct: false
      }
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const link: HTMLAnchorElement = screen.getByTestId('catalog-page');

    expect(link.href).toContain(AppRoute.Catalog);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
  });

  it ('should render correctly with ProductPage', () => {
    const {withStoreComponent} = withStore(<Breadcrumbs isProductPage/>, {
      DETAILED_PRODUCT: {
        detailedProduct: detailedProduct,
        isDetailedProductLoading: false,
        hasErrorDetailedProduct: false
      }
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const link: HTMLAnchorElement = screen.getByTestId('catalog-page');
    const expectedText3 = detailedProduct.name;
    expect(link.href).toContain(AppRoute.Catalog);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();
  });

  it ('should render correctly with BasketPage', () => {
    const {withStoreComponent} = withStore(<Breadcrumbs isBasketPage/>, {
      DETAILED_PRODUCT: {
        detailedProduct: detailedProduct,
        isDetailedProductLoading: false,
        hasErrorDetailedProduct: false
      }
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const link: HTMLAnchorElement = screen.getByTestId('catalog-page');
    const expectedText4 = 'Корзина';
    expect(link.href).toContain(AppRoute.Catalog);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText4)).toBeInTheDocument();
  });
});
