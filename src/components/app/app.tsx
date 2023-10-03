import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalog-page/catalog-page';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter([
  {
    path: AppRoute.Catalog,
    element: <CatalogPage/>
  },
]);

export function App () {
  return (
    <HelmetProvider>
      <RouterProvider router={router}/>
    </HelmetProvider>
  );
}
