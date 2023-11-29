import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MemoSearchForm } from '../search-form/search-form';
import { useAppSelector } from '../../hooks';
import { getBasketProductList } from '../../store/basket-product-data/basket-product-data-selectors';

export function Header () {
  const countProductItBasket = useAppSelector(getBasketProductList).length;

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Catalog} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <MemoSearchForm/>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {!!countProductItBasket && <span className="header__basket-count">{countProductItBasket}</span>}
        </Link>
      </div>
    </header>
  );
}
