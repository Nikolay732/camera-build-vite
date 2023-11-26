import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { getCurrentPage, getFilterCategory, getFilterLevel, getFilterMaxPrice, getFilterMinPrice, getFilterType, getSortOrder, getSortType, getTotalCountPage } from '../store/catalog-process/catalog-process-selectors';
import { AppRoute, SortOrder, SortType } from '../const';
import { ProductCategory, ProductLevel, ProductType } from '../types/product';
import { useEffect, useMemo } from 'react';
import { setCurrentPage, setFilterCategory, setFilterLevel, setFilterType, setMaxPrice, setMinPrice, setSortOrder, setSortType } from '../store/catalog-process/catalog-process-slice';
import { redirectToRoute } from '../store/action';
import { SearchParams } from '../types/search-params';

export function useCurrentParamsCatalogPage () {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useAppSelector(getCurrentPage);
  const pageNumberURL = Number(searchParams.get('page'));
  const totalCountPage = useAppSelector(getTotalCountPage);

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

  const currentFilterMinPrice = useAppSelector(getFilterMinPrice);
  const currentFilterMaxPrice = useAppSelector(getFilterMaxPrice);
  const filterMinPriceURL = searchParams.get('price_gte');
  const filterMaxPriceURL = searchParams.get('price_lte');

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (pageNumberURL <= totalCountPage && pageNumberURL > 0) {
        dispatch(setCurrentPage(pageNumberURL));
      }
      if (pageNumberURL > totalCountPage || isNaN(pageNumberURL) || pageNumberURL === 0) {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }
    }
    return () => {
      isMounted = false;
    };
  },[dispatch, pageNumberURL, totalCountPage]);

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
      if (filterTypeURL.length) {
        filterTypeURL.forEach((type) => {
          dispatch(setFilterType(type as ProductType));
        });
      }
      if (filterLevelURL.length) {
        filterLevelURL.forEach((level) => {
          dispatch(setFilterLevel(level as ProductLevel));
        });
      }
      if (filterMinPriceURL) {
        dispatch(setMinPrice(Number(filterMinPriceURL)));
      }
      if (filterMaxPriceURL) {
        dispatch(setMaxPrice(Number(filterMaxPriceURL)));
      }
    }
    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const currentParams = useMemo(() => {
    const params: SearchParams = {};
    if (pageNumberURL) {
      params.page = pageNumberURL.toString();
    }
    if (currentPage || !pageNumberURL) {
      params.page = currentPage.toString();
    }
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
    if (currentFilterMinPrice) {
      params['price_gte'] = currentFilterMinPrice.toString();
    }
    if (currentFilterMaxPrice) {
      params['price_lte'] = currentFilterMaxPrice.toString();
    }
    return params;
  }, [currentPage, currentSortType, currentSortOrder, currentFilterCategory, currentFilterType, currentFilterLevel, currentFilterMinPrice, currentFilterMaxPrice, pageNumberURL]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setSearchParams(currentParams);
    }
    return () => {
      isMounted = false;
    };
  }, [setSearchParams, currentParams]);
}
