import { FormatDate, RATINGS } from '../../const';
import { Review } from '../../types/review';
import { getFormatDate } from '../../utils';
import { RatingItem } from '../rating-item/rating-item';

type ReviewCardProps = {
  reviewItem: Review;
}

export function ReviewCard ({reviewItem}: ReviewCardProps) {
  const {userName, advantage, disadvantage, review, rating, createAt} = reviewItem;
  const date = getFormatDate(createAt, FormatDate.Date);
  const dateTime = getFormatDate(createAt, FormatDate.DateTime);

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={dateTime}>{date}</time>
      </div>
      <div className="rate review-card__rate">
        {RATINGS.map((item) => <RatingItem key={item} item={item} rating={rating}/>)}
        <p className="visually-hidden">{`Оценка: ${rating}`}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}
