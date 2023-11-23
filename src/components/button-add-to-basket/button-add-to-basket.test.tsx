import { makeFakeProductItem} from '../../mocks-for-test/mocks';
import {render, screen } from '@testing-library/react';
import { ButtonAddToBasket } from './button-add-to-basket';
import { withHistory, withStore } from '../../mocks-for-test/mock-component';

describe('Component: ButtonAddToBasket', () => {
  it('should render correctly', () => {
    const product = makeFakeProductItem();
    const buttonAddBasketTestId = 'btn-add-basket';
    const expectedText = 'Добавить в корзину';
    const {withStoreComponent} = withStore(<ButtonAddToBasket product={product}/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(buttonAddBasketTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
