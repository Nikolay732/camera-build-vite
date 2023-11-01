import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setStatusActiveModalReview, setCurrentRating } from '../../store/reviews-data/reviews-data-slice';
import { ReviewRatingValue } from '../../const';
import { ReviewRatingStar } from '../review-rating-star/review-rating-star';
import { getCurrentRating } from '../../store/reviews-data/reviews-data-selectors';
import {useForm} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';
import { postReviewAction } from '../../store/reviews-data/reviews-data-thunk';
import { useParams } from 'react-router-dom';
import { PostReview } from '../../types/review';
import {useCallback} from 'react';
import { useModal } from '../../hooks/use-esc-key-down';
import { useSubmitSuccessful } from '../../hooks/use-submit-successful';
import ReactFocusLock from 'react-focus-lock';

type ReviewFormModalProps = {
  isActive: boolean;
}

export type FormValues = {
  rate: number;
  userName: string;
  userPlus: string;
  userMinus: string;
  userComment: string;
}

export function ReviewFormModal ({isActive}: ReviewFormModalProps) {
  const dispatch = useAppDispatch();
  const currentRating = useAppSelector(getCurrentRating);
  const {cameraId} = useParams();
  const form = useForm<FormValues>({
    defaultValues: {
      rate: 0,
      userName: '',
      userPlus: '',
      userMinus: '',
      userComment: '',
    }
  });
  const {register, control, handleSubmit, formState, reset} = form;
  const {errors, isSubmitting, isSubmitSuccessful} = formState;

  const onSubmit = (data: FormValues) => {

    if (cameraId) {
      const postReview: PostReview = {
        cameraId: Number(cameraId),
        userName: data.userName,
        advantage: data.userPlus,
        disadvantage: data.userMinus,
        review: data.userComment,
        rating: Number(data.rate)
      };
      dispatch(postReviewAction(postReview));
    }
  };

  const handleButtonCloseModalClick = useCallback(() => {
    dispatch(setStatusActiveModalReview(false));
    dispatch(setCurrentRating(0));
    reset();
  }, [dispatch, reset]);

  useSubmitSuccessful(isSubmitSuccessful, handleButtonCloseModalClick);

  useModal(handleButtonCloseModalClick, isActive);

  return (
    <ReactFocusLock>
      <div className={classNames('modal', {'is-active': isActive})}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleButtonCloseModalClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <form method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-review__rate">
                  <fieldset className={classNames('rate form-review__item', {'is-invalid': errors.rate})}>
                    <legend className="rate__caption">Рейтинг
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        {
                          Object.entries(ReviewRatingValue)
                            .reverse()
                            .map(([score, title]) => (
                              <ReviewRatingStar score={Number(score)} key={score} title={title} register={register}/>
                            ))
                        }
                      </div>
                      <div className="rate__progress">
                        <span className="rate__stars">{currentRating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    <p className="rate__message">{errors.rate?.message}</p>
                  </fieldset>
                  <div className={classNames('custom-input form-review__item', {'is-invalid': errors.userName})}>
                    <label>
                      <span className="custom-input__label">Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Введите ваше имя"
                        {...register('userName', {
                          required: {
                            value: true,
                            message: 'Нужно указать имя'},
                          minLength: {
                            value: 2,
                            message: 'Минимальное количество символов 2'
                          },
                          maxLength: {
                            value: 160,
                            message: 'Максимальное количество символов 160'
                          },
                        })}
                      />
                    </label>
                    <p className="custom-input__error">{errors.userName?.message}</p>
                  </div>
                  <div className={classNames('custom-input form-review__item', {'is-invalid': errors.userPlus})}>
                    <label>
                      <span className="custom-input__label">Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Основные преимущества товара"
                        {...register('userPlus', {
                          required: {
                            value: true,
                            message: 'Нужно указать достоинства'
                          },
                          minLength: {
                            value: 2,
                            message: 'Минимальное количество символов 2'
                          },
                          maxLength: {
                            value: 160,
                            message: 'Максимальное количество символов 160'
                          },
                        })}
                      />
                    </label>
                    <p className="custom-input__error">{errors.userPlus?.message}</p>
                  </div>
                  <div className={classNames('custom-input form-review__item', {'is-invalid': errors.userMinus})}>
                    <label>
                      <span className="custom-input__label">Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Главные недостатки товара"
                        required
                        {...register('userMinus', {
                          required: {
                            value: true,
                            message: 'Нужно указать недостатки'
                          },
                          minLength: {
                            value: 2,
                            message: 'Минимальное количество символов 2'
                          },
                          maxLength: {
                            value: 160,
                            message: 'Максимальное количество символов 160'
                          },
                        })}
                      />
                    </label>
                    <p className="custom-input__error">{errors.userMinus?.message}</p>
                  </div>
                  <div className={classNames('custom-textarea form-review__item', {'is-invalid': errors.userComment})}>
                    <label>
                      <span className="custom-textarea__label">Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <textarea
                        placeholder="Поделитесь своим опытом покупки"
                        {...register('userComment', {
                          required: {
                            value: true,
                            message: 'Нужно добавить комментарий'
                          },
                          minLength: {
                            value: 2,
                            message: 'Минимальное количество символов 2'
                          },
                          maxLength: {
                            value: 160,
                            message: 'Максимальное количество символов 160'
                          },
                        })}
                      >
                      </textarea>
                    </label>
                    <div className="custom-textarea__error">{errors.userComment?.message}</div>
                  </div>
                </div>
                <button
                  className="btn btn--purple form-review__btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Отправить отзыв
                </button>
                <DevTool control={control}/>
              </form>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={handleButtonCloseModalClick}
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
