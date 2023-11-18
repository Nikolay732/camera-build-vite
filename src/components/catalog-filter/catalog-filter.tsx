import { FilterCategory } from '../filter-category/filter-category';
import { FilterLevel } from '../filter-level/filter-level';
import { FilterType } from '../filter-type/filter-type';

export function CatalogFilter () {
  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от" />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder="до"
                />
              </label>
            </div>
          </div>
        </fieldset>
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
