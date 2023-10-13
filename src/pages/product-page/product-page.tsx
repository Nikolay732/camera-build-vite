import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectedProduct } from '../../store/product-data/product-data-selectors';
import { useEffect } from 'react';
import { fetchSelectedProductAction } from '../../store/product-data/product-data-thunk';
import { Product } from '../../components/product/product';
import { Helmet } from 'react-helmet-async';

export function ProductPage () {
  const dispatch = useAppDispatch();
  const {cameraId} = useParams();
  const selectedProduct = useAppSelector(getSelectedProduct);

  useEffect (() => {
    let isMounted = true;
    if (isMounted) {
      if (cameraId) {
        dispatch(fetchSelectedProductAction(cameraId));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, cameraId]);

  if (!selectedProduct) {
    return <p>Not found</p>;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>{selectedProduct.name}</title>
      </Helmet>
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs/>
          <div className="page-content__section">
            <Product product={selectedProduct}/>
          </div>
          <div className="page-content__section">

          </div>
        </div>
      </main>
    </div>
  );
}
