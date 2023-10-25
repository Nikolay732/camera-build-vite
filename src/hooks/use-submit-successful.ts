import {useEffect} from 'react';
import { useAppDispatch } from '.';
import { setActiveModalReviewSuccessStatus } from '../store/reviews-data/reviews-data-slice';

export function useSubmitSuccessful (isSubmitSuccessful: boolean, onClickCloseModal: () => void) {
  const dispatch = useAppDispatch();

  useEffect (() => {
    let isMounted = true;
    if (isMounted) {
      if (isSubmitSuccessful) {
        onClickCloseModal();
        dispatch(setActiveModalReviewSuccessStatus(true));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [isSubmitSuccessful, onClickCloseModal, dispatch]);
}
