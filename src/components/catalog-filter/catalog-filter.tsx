import { FilterCategory } from '../filter-category/filter-category';
import { FilterLevel } from '../filter-level/filter-level';
import { FilterPrice } from '../filter-price/filter-price';
import { FilterType } from '../filter-type/filter-type';

export function CatalogFilter () {
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
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
