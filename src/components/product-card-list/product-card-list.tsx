import { ProductItem } from '../../types/product';
import { ProductCardItem } from '../product-card-item/product-card-item';

type ProductCardListProps = {
  productList: ProductItem[];
}

export function ProductCardList ({productList}: ProductCardListProps) {
  return (
    <div className="cards catalog__cards">
      {productList.map((product) => <ProductCardItem key={product.id} product={product}/>)}
    </div>
  );
}
