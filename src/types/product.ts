import { ProductCategoryValue, ProductLevelValue, ProductTypeValue } from '../const';

export type ProductItem = {
  id: number;
  name: string;
  vendorCode: string;
  type: ProductType;
  category: ProductCategory;
  description: string;
  level: ProductLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type PromoItem = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type BasketProduct = {
  count: number;
  product: ProductItem;
};

export type ProductType = typeof ProductTypeValue[keyof typeof ProductTypeValue];

export type ProductCategory = typeof ProductCategoryValue[keyof typeof ProductCategoryValue];

export type ProductLevel = typeof ProductLevelValue[keyof typeof ProductLevelValue];
