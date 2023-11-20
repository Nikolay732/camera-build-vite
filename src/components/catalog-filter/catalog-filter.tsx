import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilterResetStatus } from '../../store/catalog-process/catalog-process-selectors';
import { resetFilters, setResetStatus } from '../../store/catalog-process/catalog-process-slice';
import { FilterCategory } from '../filter-category/filter-category';
import { FilterLevel } from '../filter-level/filter-level';
import { FilterPrice } from '../filter-price/filter-price';
import { FilterType } from '../filter-type/filter-type';

export function CatalogFilter () {
  const dispatch = useAppDispatch();
  const isResetFilters = useAppSelector(getFilterResetStatus);

  const handleButtonFilterResetClick = () => {
    dispatch(resetFilters());
  };

  useEffect (() => {
    if (isResetFilters) {
      dispatch(setResetStatus(false));
    }
  }, [dispatch, isResetFilters]);

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <FilterPrice/>
        <FilterCategory/>
        <FilterType/>
        <FilterLevel/>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleButtonFilterResetClick}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
