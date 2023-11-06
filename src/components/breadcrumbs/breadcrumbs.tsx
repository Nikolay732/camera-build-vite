import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getDetailedProduct } from '../../store/detailed-product-data/detailed-product-data-selectors';

type BreadcrumbsProps = {
  isCatalogPage?: boolean;
  isProductPage?: boolean;
  isBasketPage?: boolean;
}

export function Breadcrumbs ({isCatalogPage, isProductPage, isBasketPage}: BreadcrumbsProps) {
  const detailedProduct = useAppSelector(getDetailedProduct);
  const name = detailedProduct?.name;

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            {
              isCatalogPage
                ?
                <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                :
                <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link>
            }
          </li>
          {
            isProductPage &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">{name}</span>
            </li>
          }
          {
            isBasketPage &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                Корзина
              </span>
            </li>
          }
        </ul>
      </div>
    </div>
  );
}
