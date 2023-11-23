import { withHistory, withStore } from '../../mocks-for-test/mock-component';
import { makeFakePromoProductList} from '../../mocks-for-test/mocks';
import {render, screen } from '@testing-library/react';
import { BannerSwiper } from './banner-swiper';

describe('Component: BannerSwiper', () => {
  const mockPromoList = makeFakePromoProductList();

  it('should render correctly', () => {
    const {withStoreComponent} = withStore (
      <BannerSwiper promoList={mockPromoList}/>, {});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByTestId('swiper-promo').length).toBe(mockPromoList.length);
  });
});
