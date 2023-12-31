import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { Product } from '../../components/product/product';
import { Helmet } from 'react-helmet-async';
import { ProductSimilar } from '../../components/product-similar/product-similar';
import { CatalogAddItemModal } from '../../components/catalog-add-item-modal/catalog-add-item-modal';
import { Reviews } from '../../components/reviews/reviews';
import { UpButton } from '../../components/up-button/up-button';
import { Footer } from '../../components/footer/footer';
import { ReviewFormModal } from '../../components/review-form-modal/review-form-modal';
import { getStatusActiveModalReview, getStatusPostReviewSucces} from '../../store/reviews-data/reviews-data-selectors';
import { Spinner } from '../../components/spinner/spinner';
import { ReviewSuccessModal } from '../../components/review-success-modal/review-success-modal';
import { getDetailedProduct, getProductPageDataLoadStatus, getProductPageErrorLoadStatus } from '../../store/detailed-product-data/detailed-product-data-selectors';
import { getSimilarProductList } from '../../store/similar-product-data/similar-product-data-selectors';
import { fetchDetailedProductAction } from '../../store/detailed-product-data/detailed-product-data-thunk';
import { fetchSimilarProductListAction } from '../../store/similar-product-data/similar-product-data-thunk';
import { fetchReviewListAction } from '../../store/reviews-data/reviews-data-thunk';
import { getSelectedProduct, getStatusActiveModalAddItem, getStatusActiveModalAddItemSuccess } from '../../store/catalog-process/catalog-process-selectors';
import { ErrorPage } from '../error-page/error-page';
import { CatalogAddItemSuccessModal } from '../../components/catalog-add-item-success-modal/catalog-add-item-success-modal';

export function ProductPage () {
  const dispatch = useAppDispatch();
  const {cameraId} = useParams();
  const detailedProduct = useAppSelector(getDetailedProduct);
  const similarProductList = useAppSelector(getSimilarProductList);
  const selectedProduct = useAppSelector(getSelectedProduct);
  const isActiveModalAddItem = useAppSelector(getStatusActiveModalAddItem);
  const isActiveModalAddItemSuccess = useAppSelector(getStatusActiveModalAddItemSuccess);
  const isActiveModalReview = useAppSelector(getStatusActiveModalReview);
  const isPostReviewSuccess = useAppSelector(getStatusPostReviewSucces);
  const isLoadingData = useAppSelector(getProductPageDataLoadStatus);
  const hasError = useAppSelector(getProductPageErrorLoadStatus);

  useEffect (() => {
    let isMounted = true;
    if (isMounted) {
      if (cameraId) {
        dispatch(fetchDetailedProductAction(cameraId));
        dispatch(fetchSimilarProductListAction(cameraId));
        dispatch(fetchReviewListAction(cameraId));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, cameraId]);

  if (isLoadingData) {
    return <Spinner/>;
  }

  if (hasError || !detailedProduct) {
    return <ErrorPage/>;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>{detailedProduct.name}</title>
      </Helmet>
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs isProductPage/>
          <div className="page-content__section">
            <Product product={detailedProduct}/>
          </div>
          {
            similarProductList.length > 0 &&
            <div className="page-content__section">
              <ProductSimilar similarProductList={similarProductList}/>
            </div>
          }
          <div className="page-content__section">
            <Reviews/>
          </div>
        </div>
        {isActiveModalReview && <ReviewFormModal isActive={isActiveModalReview}/>}
        {isPostReviewSuccess && <ReviewSuccessModal isActive={isPostReviewSuccess}/>}
        {selectedProduct && isActiveModalAddItem && <CatalogAddItemModal product={selectedProduct} isActive={isActiveModalAddItem}/>}
        {isActiveModalAddItemSuccess && <CatalogAddItemSuccessModal isActive={isActiveModalAddItemSuccess}/>}
      </main>
      <UpButton/>
      <Footer/>
    </div>
  );
}
