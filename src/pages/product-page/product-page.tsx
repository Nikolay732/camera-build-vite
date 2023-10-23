import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDetailedProduct, getProductPageDataLoadStatus, getProductPageErrorLoadStatus, getSelectedProduct, getSimilarProductList, getStatusActiveModalAddItem } from '../../store/product-data/product-data-selectors';
import { useEffect } from 'react';
import { fetchDetailedProductAction, fetchSimilarProductListAction } from '../../store/product-data/product-data-thunk';
import { Product } from '../../components/product/product';
import { Helmet } from 'react-helmet-async';
import { ProductSimilar } from '../../components/product-similar/product-similar';
import { CatalogAddItem } from '../../components/catalog-add-item/catalog-add-item';
import { Reviews } from '../../components/reviews/reviews';
import { fetchReviewsListAction } from '../../store/reviews-data/reviews-data-thunk';
import { UpButton } from '../../components/up-button/up-button';
import { Footer } from '../../components/footer/footer';
import { ReviewFormModal } from '../../components/review-form-modal/review-form-modal';
import { getStatusActiveModalReview } from '../../store/reviews-data/reviews-data-selectors';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { Spinner } from '../../components/spinner/spinner';
import { AppRoute } from '../../const';

export function ProductPage () {
  const dispatch = useAppDispatch();
  const {cameraId} = useParams();
  const detailedProduct = useAppSelector(getDetailedProduct);
  const similarProductList = useAppSelector(getSimilarProductList);
  const selectedProduct = useAppSelector(getSelectedProduct);
  const isActiveModalAddItem = useAppSelector(getStatusActiveModalAddItem);
  const isActiveModalReview = useAppSelector(getStatusActiveModalReview);
  const isLoadingData = useAppSelector(getProductPageDataLoadStatus);
  const hasError = useAppSelector(getProductPageErrorLoadStatus);

  useEffect (() => {
    let isMounted = true;
    if (isMounted) {
      if (cameraId) {
        dispatch(fetchDetailedProductAction(Number(cameraId)));
        dispatch(fetchSimilarProductListAction(Number(cameraId)));
        dispatch(fetchReviewsListAction(Number(cameraId)));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, cameraId]);

  if (isLoadingData) {
    return <Spinner/>;
  }

  if (hasError || detailedProduct === null) {
    return <NotFoundPage/>;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>{detailedProduct.name}</title>
      </Helmet>
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs page={AppRoute.Product} breadCrumb={detailedProduct.name}/>
          <div className="page-content__section">
            <Product product={detailedProduct}/>
          </div>
          {
            similarProductList.length > 0 &&
            <div className="page-content__section">
              <ProductSimilar similarProductList={similarProductList}/>
            </div>
          }
          {selectedProduct && <CatalogAddItem product={selectedProduct} isActiveModalAddItem={isActiveModalAddItem}/>}
          <div className="page-content__section">
            <Reviews/>
          </div>
        </div>
        <ReviewFormModal isActiveModalReview={isActiveModalReview}/>
      </main>
      <UpButton/>
      <Footer/>
    </div>
  );
}
