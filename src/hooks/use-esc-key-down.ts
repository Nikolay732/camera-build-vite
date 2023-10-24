import {useEffect} from 'react';

export function useModal (onClickCloseModal: () => void, isActiveModal: boolean) {

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const handleEscKeydown = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          onClickCloseModal();
        }
      };
      window.addEventListener('keydown', handleEscKeydown);
      if (isActiveModal) {
        document.body.style.overflow = 'hidden';
      }
      return () => {
        window.removeEventListener('keydown', handleEscKeydown);
        document.body.style.overflow = '';
      };
    }
    return () => {
      isMounted = false;
    };
  }, [onClickCloseModal, isActiveModal]);
}
