
export type ProductItem = {
  id: number;
  name: string;
  vendorCode: string;
  type: 'Коллекционная'| 'Моментальная' | 'Цифровая' | 'Плёночная';
  category: 'Видеокамера' | 'Фотоаппарат';
  description: string;
  level: 'Нулевой'| 'Любительский'| 'Профессиональный';
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
