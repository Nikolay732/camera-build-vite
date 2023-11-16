import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productListData } from './product-list-data/product-list-data-slice';
import { reviewsData } from './reviews-data/reviews-data-slice';
import { promoProductData } from './promo-product-data/promo-product-data-slice';
import { detaildeProductData } from './detailed-product-data/detailed-product-data-slice';
import { similarProductData } from './similar-product-data/similar-product-data-slice';
import { basketProductData } from './basket-product-data/basket-product-data-slice';
import { catalogProcess } from './catalog-process/catalog-process-slice';

export const rootReducer = combineReducers({
  [NameSpace.ProductList]: productListData.reducer,
  [NameSpace.PromoProductList]: promoProductData.reducer,
  [NameSpace.DetailedProduct]: detaildeProductData.reducer,
  [NameSpace.SimilarProductList]: similarProductData.reducer,
  [NameSpace.ReviewList]: reviewsData.reducer,
  [NameSpace.BasketProductList]: basketProductData.reducer,
  [NameSpace.Catalog]: catalogProcess.reducer,
});
