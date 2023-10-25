import classNames from 'classnames';
import { useModal } from '../../hooks/use-esc-key-down';
import { useAppDispatch } from '../../hooks';
import { setActiveModalReviewSuccessStatus } from '../../store/reviews-data/reviews-data-slice';

type ReviewSuccessModalProps = {
  isActive: boolean;
}

export function ReviewSuccessModal ({isActive}:ReviewSuccessModalProps) {
  const dispatch = useAppDispatch();

  const handleButtonCloseModalClick = () => {
    dispatch(setActiveModalReviewSuccessStatus(false));
  };

  useModal(handleButtonCloseModalClick, isActive);

  return (
    <div className={classNames('modal', 'modal--narrow', {'is-active': isActive})}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleButtonCloseModalClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleButtonCloseModalClick}>Вернуться к покупкам
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
  );
}
