import { RATINGS } from '../../const';
import { RatingItem } from '../rating-item/rating-item';

type RatingProps = {
  rating: number;
}

export function Rating ({rating}:RatingProps) {
  return (
    RATINGS.map((item) => <RatingItem key={item} item={item} rating={rating}/>)
  );
}

