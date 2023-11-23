import { withHistory, withStore } from '../../mocks-for-test/mock-component';
import { makeFakePromoProductList} from '../../mocks-for-test/mocks';
import {render, screen } from '@testing-library/react';
import { Banner } from './banner';

describe('Component: Banner', () => {
  const mockPromoItem = makeFakePromoProductList()[0];

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(
      <Banner promoProduct={{...mockPromoItem}}/>, {});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const expectedText = 'Профессиональная камера от известного производителя';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByAltText('баннер')).toBeInTheDocument();
    expect(screen.getByText(mockPromoItem.name)).toBeInTheDocument();
  });
});

