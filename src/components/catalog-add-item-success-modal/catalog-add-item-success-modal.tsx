import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { setActiveModalAddItemSuccessStatus } from '../../store/product-list-data/product-list-data-slice';
import { useModal } from '../../hooks/use-esc-key-down';
import ReactFocusLock from 'react-focus-lock';
import { Link } from 'react-router-dom';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../const';

type CatalogAddItemSuccessModalProps = {
  isActive: boolean;
}

export function CatalogAddItemSuccessModal ({isActive}:CatalogAddItemSuccessModalProps) {
  const dispatch = useAppDispatch();

  const hanldeButtonCloseClick = () => {
    dispatch(setActiveModalAddItemSuccessStatus(false));
  };
  const handleButtonGoToBasketClick = () => {
    dispatch(setActiveModalAddItemSuccessStatus(false));
    dispatch(redirectToRoute(AppRoute.Basket));
  };

  useModal(hanldeButtonCloseClick, isActive);

  return (
    <ReactFocusLock>
      <div className={classNames('modal', 'modal--narrow', {'is-active': isActive})}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={hanldeButtonCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width="86" height="80" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <div className="modal__buttons">
              <Link className="btn btn--transparent modal__btn" to="#" onClick={hanldeButtonCloseClick}>
                Продолжить покупки
              </Link>
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                onClick={handleButtonGoToBasketClick}
              >
                Перейти в корзину
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={hanldeButtonCloseClick}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}
