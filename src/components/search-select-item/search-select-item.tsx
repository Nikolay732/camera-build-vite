import { memo, useEffect, useRef } from 'react';
import { ProductItem } from '../../types/product';
import { KeyCode } from '../../const';

type SearchSelectItemProps = {
  product: ProductItem;
  isCurrent: boolean;
  onClick: (cameraId: number) => void;
}

function SearchSelectItem ({product, isCurrent, onClick}:SearchSelectItemProps) {
  const productItemRef = useRef<HTMLLIElement>(null);
  const {id, name} = product;

  useEffect(() => {
    if (isCurrent) {
      productItemRef.current?.focus();
    }
  }, [isCurrent]);

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === KeyCode.Enter) {
      evt.preventDefault();
      onClick(id);
    }
  };

  return (
    <li
      className="form-search__select-item"
      tabIndex={isCurrent ? -1 : 0}
      ref={productItemRef}
      onClick={() => onClick(id)}
      onKeyDown={handleKeyDown}
    >
      {name}
    </li>
  );
}

export const MemoSearchSelectItem = memo(SearchSelectItem);
