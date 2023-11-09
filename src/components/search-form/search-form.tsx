import { ProductItem } from '../../types/product';
import { SearchSelectItem } from '../search-select-item/search-select-item';

export function SearchForm () {
  const searchProductList: ProductItem[] = [];

  return (
    <div className="form-search">
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту"/>
        </label>
        <ul className="form-search__select-list">
          {searchProductList.map((item) => <SearchSelectItem key={item.id} product={item}/>)}
        </ul>
      </form>
      <button className="form-search__reset" type="reset">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
