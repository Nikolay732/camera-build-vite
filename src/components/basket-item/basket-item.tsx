import { BasketProduct} from '../../types/product';
import { BasketItemDescription } from '../basket-item-description/basket-item-description';

type BasketItemProps = {
  basketProduct: BasketProduct;
}

export function BasketItem ({basketProduct}: BasketItemProps) {
  const {count, product} = basketProduct;

  return (
    <li className="basket-item">
      <BasketItemDescription product={product}/>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" value={count} min="1" max="99" aria-label="количество товара"/>
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {`${(product.price * count).toLocaleString('ru')} ₽`}
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
