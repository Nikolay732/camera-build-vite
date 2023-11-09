import { ProductItem } from '../../types/product';

type SearchSelectItemProps = {
  product: ProductItem;
}

export function SearchSelectItem ({product}:SearchSelectItemProps) {
  const {name} = product;

  return (
    <li
      className="form-search__select-item"
      tabIndex={0}
    >
      {name}
    </li>
  );
}
