import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDetailedProduct, getSelectedProduct, getSimilarProductList, getStatusActiveModalAddItem } from '../../store/product-data/product-data-selectors';
import { useEffect } from 'react';
import { fetchDetailedProductAction, fetchSimilarProductListAction } from '../../store/product-data/product-data-thunk';
import { Product } from '../../components/product/product';
import { Helmet } from 'react-helmet-async';
import { ProductSimilar } from '../../components/product-similar/product-similar';
import { CatalogAddItem } from '../../components/catalog-add-item/catalog-add-item';

export function ProductPage () {
  const dispatch = useAppDispatch();
  const {cameraId} = useParams();
  const detailedProduct = useAppSelector(getDetailedProduct);
  const similarProductList = useAppSelector(getSimilarProductList);
  const selectedProduct = useAppSelector(getSelectedProduct);
  const isActiveModalAddItem = useAppSelector(getStatusActiveModalAddItem);

  useEffect (() => {
    let isMounted = true;
    if (isMounted) {
      if (cameraId) {
        dispatch(fetchDetailedProductAction(cameraId));
        dispatch(fetchSimilarProductListAction(cameraId));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, cameraId]);

  if (!detailedProduct) {
    return <p>Not found</p>;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>{detailedProduct.name}</title>
      </Helmet>
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs/>
          <div className="page-content__section">
            <Product product={detailedProduct}/>
          </div>
          {
            similarProductList.length > 0 &&
            <div className="page-content__section">
              <ProductSimilar similarProductList={similarProductList}/>
            </div>
          }
          {selectedProduct && <CatalogAddItem product={selectedProduct} isActive={isActiveModalAddItem}/>}
        </div>
      </main>
    </div>
  );
}
