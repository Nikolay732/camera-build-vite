import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getPromoProductList = (state: State) => state[NameSpace.PromoProductList].promoProductList;

export const getStatusPromoProductListLoading = (state: State) => state[NameSpace.PromoProductList].isPromoProductListLoading;

export const getErrorStatusPromoProductList = (state: State) => state[NameSpace.PromoProductList].hasErrorPromoProductList;
