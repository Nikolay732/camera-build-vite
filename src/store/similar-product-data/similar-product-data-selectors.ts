import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getSimilarProductList = (state: State) => state[NameSpace.SimilarProductList].similarProductList;

export const getStatusSimilarProductListLoading = (state: State) => state[NameSpace.SimilarProductList].isSimilarProductListLoading;

export const getErrorStatusSimilarProduct = (state: State) => state[NameSpace.SimilarProductList].hasErrorSimilarProductList;
