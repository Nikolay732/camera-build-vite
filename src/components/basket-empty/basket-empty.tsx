import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './basket-empty.css';

export function BasketEmpty () {
  return (
    <Fragment>
      <div className='title'>Корзина пуста</div>
      <Link className='button btn btn--putple product-card__btn' to={AppRoute.Catalog} data-testid='back-home'>Вернуться на главную страницу</Link>
    </Fragment>
  );
}
