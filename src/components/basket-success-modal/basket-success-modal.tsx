import classNames from 'classnames';
import { useModal } from '../../hooks/use-esc-key-down';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ReactFocusLock from 'react-focus-lock';
import { setStatusModalSuccess } from '../../store/basket-product-data/basket-product-data-slice';
import { AppRoute, Status } from '../../const';
import { redirectToRoute } from '../../store/action';
import { getStatusPostOrder } from '../../store/basket-product-data/basket-product-data-selectors';

type BasketSuccessModalProps = {
  isActive: boolean;
}

export function BasketSuccessModal ({isActive}:BasketSuccessModalProps) {
  const dispatch = useAppDispatch();
  const postOrderStatus = useAppSelector(getStatusPostOrder);

  const handleButtonCloseModalClick = () => {
    dispatch(setStatusModalSuccess(false));
  };

  const handleButtonGoToCatalogClick = () => {
    dispatch(redirectToRoute(AppRoute.Catalog));
    dispatch(setStatusModalSuccess(false));
  };

  useModal(handleButtonCloseModalClick, isActive);

  return (
    <ReactFocusLock>
      <div className={classNames('modal', 'modal--narrow', {'is-active': isActive})}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleButtonCloseModalClick}></div>
          <div className="modal__content">
            {postOrderStatus !== Status.Error &&
              <>
                <p className="title title--h4">Спасибо за покупку</p>
                <svg className="modal__icon" width="80" height="78" aria-hidden="true">
                  <use xlinkHref="#icon-review-success"></use>
                </svg>
              </>}
            {postOrderStatus === Status.Error && <p className="title title--h4">Произошла ошибка, попробуйте позже</p>}
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleButtonGoToCatalogClick}>Вернуться к покупкам
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleButtonCloseModalClick}>
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
