import { getReviewList } from '../../store/reviews-data/reviews-data-selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ReviewCard } from '../review-card/review-card';
import {useState} from 'react';
import { setStatusActiveModalReview } from '../../store/reviews-data/reviews-data-slice';
import { getSortByDate } from '../../utils';

export function Reviews () {
  const dispatch = useAppDispatch();
  const reviewList = useAppSelector(getReviewList);
  const [lastReviewItemIndex, setLastReviewItemIndex] = useState<number>(3);
  const currentReviewList = reviewList.slice().sort(getSortByDate).slice(0, lastReviewItemIndex);

  const handleButtonShowRevievsClick = () => {
    setLastReviewItemIndex((prev) => prev + 3);
  };

  const handleButtonOpenModalClick = () => {
    dispatch(setStatusActiveModalReview(true));
  };

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button
            className="btn"
            type="button"
            onClick={handleButtonOpenModalClick}
          >
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {currentReviewList.map((review) => <ReviewCard key={review.id} reviewItem={review}/>)}
        </ul>
        <div className="review-block__buttons">
          {
            currentReviewList.length < reviewList.length &&
            <button
              className="btn btn--purple"
              type="button"
              onClick={handleButtonShowRevievsClick}
            >
              Показать больше отзывов
            </button>
          }

        </div>
      </div>
    </section>
  );
}
