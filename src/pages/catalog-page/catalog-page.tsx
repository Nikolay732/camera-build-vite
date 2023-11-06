import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { CatalogAside } from '../../components/catalog-aside/catalog-aside';
import { CataloSort } from '../../components/catalog-sort/catalog-sort';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Pagination } from '../../components/pagination/pagination';
import { ProductCardList } from '../../components/product-card-list/product-card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCatalogPageDataLoadingStatus, getCatalogPageErrorLoadStatus, getCurrentPage, getProductList, getSelectedProduct, getStatusActiveModalAddItem} from '../../store/product-list-data/product-list-data-selectors';
import {useEffect, useMemo} from 'react';
import { fetchProductListAction } from '../../store/product-list-data/product-list-data-thunk';
import { AppRoute, Page } from '../../const';
import { BannerSwiper } from '../../components/banner-swiper/banner-swiper';
import { CatalogAddItemModal } from '../../components/catalog-add-item-modal/catalog-add-item-modal';
import { Spinner } from '../../components/spinner/spinner';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { Helmet } from 'react-helmet-async';
import { getPromoProductList } from '../../store/promo-product-data/promo-product-data-selectors';
import { fetchPromoProductListAction } from '../../store/promo-product-data/promo-product-data-thunk';
import { useSearchParams } from 'react-router-dom';
import { setCurrentPage } from '../../store/product-list-data/product-list-data-slice';
import { SearchParams } from '../../types/search-params';
import { redirectToRoute } from '../../store/action';

export function CatalogPage () {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const productList = useAppSelector(getProductList);
  const promoList = useAppSelector(getPromoProductList);
  const pageState = useAppSelector(getCurrentPage);
  const pageNumberURL = Number(searchParams.get('page'));
  const currentPage = pageNumberURL ? pageNumberURL : pageState;
  const totalCountProduct = productList.length;
  const totalCountPage = Math.ceil(totalCountProduct / Page.Per);
  const lastProductIndex = currentPage * Page.Per;
  const firstProductIndex = lastProductIndex - Page.Per;
  const currentProductList = productList.slice(firstProductIndex, lastProductIndex);
  const selectedProduct = useAppSelector(getSelectedProduct);
  const isActiveModalAddItem = useAppSelector(getStatusActiveModalAddItem);
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

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (currentPage <= totalCountPage && currentPage > 0) {
        dispatch(setCurrentPage(currentPage));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, totalCountPage, currentPage]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (currentPage > totalCountPage || isNaN(currentPage) || currentPage === 0) {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, totalCountPage, currentPage]);

  const currentParams = useMemo(() => {
    const params: SearchParams = {};
    params.page = currentPage.toString();
    return params;
  }, [currentPage]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setSearchParams(currentParams);
    }
    return () => {
      isMounted = false;
    };
  }, [setSearchParams, currentParams]);

  if (isLoadingData) {
    return <Spinner/>;
  }

  if (hasError) {
    return <NotFoundPage/>;
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
                <CatalogAside/>
                <div className="catalog__content">
                  <CataloSort/>
                  <ProductCardList productList={currentProductList}/>
                  {totalCountPage > 1 && <Pagination totalCountPage={totalCountPage}/>}
                </div>
                {selectedProduct && <CatalogAddItemModal product={selectedProduct} isActive={isActiveModalAddItem}/>}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
