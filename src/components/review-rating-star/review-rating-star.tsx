import { useAppDispatch } from '../../hooks';
import { setCurrentRating } from '../../store/reviews-data/reviews-data-slice';

type ReviewRatingStarProps = {
  score: string;
  title: string;
}

export function ReviewRatingStar ({score, title}: ReviewRatingStarProps) {
  const dispatch = useAppDispatch();

  const handleInputChange = () => {
    dispatch(setCurrentRating(score));
  };

  return (
    <>
      <input
        className="visually-hidden"
        id={`star-${score}`} name="rate"
        type="radio"
        value={score}
        onChange={handleInputChange}
      />
      <label className="rate__label" htmlFor={`star-${score}`} title={title}></label>
    </>
  );
}
