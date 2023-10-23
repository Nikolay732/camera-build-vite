import { Routes, Route } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalog-page/catalog-page';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { ProductPage } from '../../pages/product-page/product-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

export function App () {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Catalog} element={<CatalogPage/>}/>
          <Route path={AppRoute.Product} element={<ProductPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
