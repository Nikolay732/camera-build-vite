import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { CatalogFilter } from '../../components/catalog-filter/catalog-filter';
import { CataloSort } from '../../components/catalog-sort/catalog-sort';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Pagination } from '../../components/pagination/pagination';
import { ProductCardList } from '../../components/product-card-list/product-card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCatalogPageDataLoadingStatus, getCatalogPageErrorLoadStatus, getCurrentPage, getSelectedProduct, getStatusActiveModalAddItem, getStatusActiveModalAddItemSuccess} from '../../store/product-list-data/product-list-data-selectors';
import {useEffect, useMemo} from 'react';
import { fetchProductListAction } from '../../store/product-list-data/product-list-data-thunk';
import { AppRoute, Page, SortOrder, SortType } from '../../const';
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
import { CatalogAddItemSuccessModal } from '../../components/catalog-add-item-success-modal/catalog-add-item-success-modal';
import { getFilterCategory, getFilterLevel, getFilterType, getSortOrder, getSortType, getSortedProductList } from '../../store/catalog-process/catalog-process-selectors';
import { setFilterCategory, setFilterLevel, setFilterType, setSortOrder, setSortType } from '../../store/catalog-process/catalog-process-slice';
import { ProductCategory, ProductLevel, ProductType } from '../../types/product';

export function CatalogPage () {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const productList = useAppSelector(getSortedProductList);
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

  const currentSortType = useAppSelector(getSortType);
  const currentSortOrder = useAppSelector(getSortOrder);
  const sortTypeURL = searchParams.get('sort');
  const sortOrderURL = searchParams.get('order');

  const currentFilterCategory = useAppSelector(getFilterCategory);
  const filterCategoryURL = searchParams.get('category');

  const currentFilterType = useAppSelector(getFilterType);
  const filterTypeURL: string[] = [];

  const currentFilterLevel = useAppSelector(getFilterLevel);
  const filterLevelURL: string[] = [];

  for (const [key, value] of searchParams.entries()) {
    if (key === 'type' && !currentFilterType.includes(value as ProductType)) {
      filterTypeURL.push(value);
    }
    if (key === 'level' && !currentFilterLevel.includes(value as ProductLevel)) {
      filterLevelURL.push(value);
    }
  }

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

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (sortOrderURL && sortTypeURL) {
        dispatch(setSortType(sortTypeURL as SortType));
        dispatch(setSortOrder(sortOrderURL as SortOrder));
      }
      if (filterCategoryURL) {
        dispatch(setFilterCategory(filterCategoryURL as ProductCategory));
      }
      if (filterTypeURL?.length) {
        filterTypeURL.forEach((type) => {
          dispatch(setFilterType(type as ProductType));
        });
      }
      if (filterLevelURL.length) {
        filterLevelURL.forEach((level) => {
          dispatch(setFilterLevel(level as ProductLevel));
        });
      }
    }
    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const currentParams = useMemo(() => {
    const params: SearchParams = {};
    params.page = currentPage.toString();

    if (currentSortType && currentSortOrder) {
      params.sort = currentSortType;
      params.order = currentSortOrder;
    }
    if (currentFilterCategory) {
      params.category = currentFilterCategory;
    }
    if (currentFilterType) {
      params.type = currentFilterType;
    }
    if (currentFilterLevel) {
      params.level = currentFilterLevel;
    }

    return params;
  }, [currentPage, currentSortType, currentSortOrder, currentFilterCategory, currentFilterType, currentFilterLevel]);

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
                <div className="catalog__aside">
                  <CatalogFilter/>
                </div>
                <div className="catalog__content">
                  <CataloSort/>
                  <ProductCardList productList={currentProductList}/>
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
