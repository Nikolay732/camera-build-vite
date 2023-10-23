import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalog-page/catalog-page';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { ProductPage } from '../../pages/product-page/product-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';

const router = createBrowserRouter([
  {
    path: AppRoute.Catalog,
    element: <CatalogPage/>
  },
  {
    path: AppRoute.Product,
    element: <ProductPage/>
  },
  {
    path: '*',
    element: <NotFoundPage/>
  },
]);

export function App () {
  return (
    <HelmetProvider>
      <RouterProvider router={router}/>
    </HelmetProvider>
  );
}
