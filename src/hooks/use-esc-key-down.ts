import {useEffect} from 'react';

export function useEscKeyDown (onClickCloseModal: () => void) {
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const handleEscKeydown = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          onClickCloseModal();
        }
      };
      window.addEventListener('keydown', handleEscKeydown);
      return () => {
        window.removeEventListener('keydown', handleEscKeydown);
      };
    }
    return () => {
      isMounted = false;
    };
  }, [onClickCloseModal]);
}
