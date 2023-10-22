import {useEffect} from 'react';

export function useSubmitSuccessful (isSubmitSuccessful: boolean, onClickCloseModal: () => void) {
  useEffect (() => {
    let isMounted = true;
    if (isMounted) {
      if (isSubmitSuccessful) {
        onClickCloseModal();
      }
    }
    return () => {
      isMounted = false;
    };
  }, [isSubmitSuccessful, onClickCloseModal]);
}
