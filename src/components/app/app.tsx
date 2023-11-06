import { Routes, Route } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalog-page/catalog-page';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { ProductPage } from '../../pages/product-page/product-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { BasketPage } from '../../pages/basket-page/basket-page';

export function App () {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Catalog}
          element={<CatalogPage/>}
        />
        <Route
          path={`${AppRoute.Product}/:cameraId`}
          element={<ProductPage/>}
        />
        <Route
          path={`${AppRoute.Basket}`}
          element={<BasketPage/>}
        />
        <Route
          path='*'
          element={<NotFoundPage/>}
        />
      </Routes>
    </HelmetProvider>
  );
}
