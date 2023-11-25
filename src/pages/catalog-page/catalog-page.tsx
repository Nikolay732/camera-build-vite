import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { CatalogFilter } from '../../components/catalog-filter/catalog-filter';
import { CataloSort } from '../../components/catalog-sort/catalog-sort';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Pagination } from '../../components/pagination/pagination';
import { ProductCardList } from '../../components/product-card-list/product-card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCatalogPageDataLoadingStatus, getCatalogPageErrorLoadStatus } from '../../store/product-list-data/product-list-data-selectors';
import {useEffect } from 'react';
import { fetchProductListAction } from '../../store/product-list-data/product-list-data-thunk';
import { BannerSwiper } from '../../components/banner-swiper/banner-swiper';
import { CatalogAddItemModal } from '../../components/catalog-add-item-modal/catalog-add-item-modal';
import { Spinner } from '../../components/spinner/spinner';
import { Helmet } from 'react-helmet-async';
import { getPromoProductList } from '../../store/promo-product-data/promo-product-data-selectors';
import { fetchPromoProductListAction } from '../../store/promo-product-data/promo-product-data-thunk';
import { CatalogAddItemSuccessModal } from '../../components/catalog-add-item-success-modal/catalog-add-item-success-modal';
import { getCurrentProductList, getFilteredProductList, getSelectedProduct, getStatusActiveModalAddItem, getStatusActiveModalAddItemSuccess, getTotalCountPage} from '../../store/catalog-process/catalog-process-selectors';
import { ErrorPage } from '../error-page/error-page';
import { useCurrentParamsCatalogPage } from '../../hooks/use-current-params-catalog-page';

export function CatalogPage () {
  const dispatch = useAppDispatch();
  useCurrentParamsCatalogPage();
  const productList = useAppSelector(getFilteredProductList);
  const promoList = useAppSelector(getPromoProductList);
  const totalCountPage = useAppSelector(getTotalCountPage);
  const currentProductList = useAppSelector(getCurrentProductList);
  const selectedProduct = useAppSelector(getSelectedProduct);

  const isActiveModalAddItem = useAppSelector(getStatusActiveModalAddItem);
  const isActiveModalAddItemSuccess = useAppSelector(getStatusActiveModalAddItemSuccess);
  const isLoadingData = useAppSelector(getCatalogPageDataLoadingStatus);
  const hasError = useAppSelector(getCatalogPageErrorLoadStatus);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchProductListAction());
      dispatch(fetchPromoProductListAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (isLoadingData) {
    return <Spinner/>;
  }

  if (hasError) {
    return <ErrorPage/>;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Catalog</title>
      </Helmet>
      <Header/>
      <main>
        <BannerSwiper promoList={promoList}/>
        <div className="page-content">
          <Breadcrumbs isCatalogPage/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter/>
                </div>
                <div className="catalog__content">
                  <CataloSort/>
                  {
                    productList.length > 0
                      ? <ProductCardList productList={currentProductList}/>
                      : <div style={{paddingTop: '30px'}}>По вашему запросу ничего не найдено</div>
                  }
                  {totalCountPage > 1 && <Pagination totalCountPage={totalCountPage}/>}
                </div>
                {selectedProduct && isActiveModalAddItem && <CatalogAddItemModal product={selectedProduct} isActive={isActiveModalAddItem}/>}
                {isActiveModalAddItemSuccess && <CatalogAddItemSuccessModal isActive={isActiveModalAddItemSuccess}/>}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
