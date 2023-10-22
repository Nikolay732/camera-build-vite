import { UseFormRegister } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { setCurrentRating } from '../../store/reviews-data/reviews-data-slice';
import { FormValues } from '../review-form-modal/review-form-modal';

type ReviewRatingStarProps = {
  score: number;
  title: string;
  register: UseFormRegister<FormValues>;
}

export function ReviewRatingStar ({score, title, register}: ReviewRatingStarProps) {

  const dispatch = useAppDispatch();

  const handleInputChange = () => {
    dispatch(setCurrentRating(score));
  };

  return (
    <>
      <input
        className="visually-hidden"
        id={`star-${score}`}
        type="radio"
        value={score}
        {...register('rate', {
          required: {
            value: true,
            message: 'Нужно оценить товар'},
        })}
        onChange={handleInputChange}
      />
      <label className="rate__label" htmlFor={`star-${score}`} title={title}></label>
    </>
  );
}
