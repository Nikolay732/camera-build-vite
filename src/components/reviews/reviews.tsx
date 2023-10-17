import { getReviewsList } from '../../store/reviews-data/reviews-data-selectors';
import { useAppSelector } from '../../hooks';
import { ReviewCard } from '../review-card/review-card';
import {useState} from 'react';

export function Reviews () {
  const reviewList = useAppSelector(getReviewsList);
  const [lastReviewItemIndex, setLastReviewItemIndex] = useState<number>(3);
  const currentReviewList = reviewList.slice(0, lastReviewItemIndex);

  const handleButtonClick = () => {
    setLastReviewItemIndex((prev) => prev + 3);
  };


  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
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
              onClick={handleButtonClick}
            >
              Показать больше отзывов
            </button>
          }

        </div>
      </div>
    </section>
  );
}
