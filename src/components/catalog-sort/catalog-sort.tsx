import { useMemo } from 'react';
import { SortOrder, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSortOrder, getSortType } from '../../store/catalog-process/catalog-process-selectors';
import { setSortOrder, setSortType } from '../../store/catalog-process/catalog-process-slice';

export function CataloSort () {
  const dispatch = useAppDispatch();

  const currentSortType = useAppSelector(getSortType);
  const currentSortOrder = useAppSelector(getSortOrder);

  const handleTypeChange = useMemo(() => (value: SortType) => {
    dispatch(setSortType(value));
  }, [dispatch]);

  const handleOrderChange = useMemo(() => (value: SortOrder) => {
    dispatch(setSortOrder(value));
  }, [dispatch]);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {Object.entries(SortType).map(([type, value]) => (
              <div className="catalog-sort__btn-text" key={type}>
                <input
                  type="radio"
                  id={`sort${type}`}
                  name="sort"
                  onChange={() => handleTypeChange(value)}
                  checked={value === currentSortType}
                />
                <label htmlFor={`sort${type}`}>{value}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {Object.entries(SortOrder).map(([type, value]) => (
              <div className={`catalog-sort__btn catalog-sort__btn--${type.toLowerCase()}`} key={type}>
                <input
                  type="radio"
                  id={type.toLowerCase()}
                  name="sort-icon"
                  aria-label={value}
                  onChange={() => handleOrderChange(value)}
                  checked={currentSortOrder === value}
                />
                <label htmlFor={type.toLowerCase()}>
                  <svg width={16} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-sort" />
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
