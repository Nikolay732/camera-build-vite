import { PromoItem } from '../../types/product';
import { APIRoute } from '../../const';
import { Link } from 'react-router-dom';

type BannerProps = {
  promoProduct: PromoItem;
}

export function Banner ({promoProduct}: BannerProps) {
  const {id, name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = promoProduct;

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}/>
        <img src={previewImg} srcSet={previewImg2x} width={1280} height={280} alt="баннер"/>
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${APIRoute.ProductList}/${id}`}>Подробнее</Link>
      </p>
    </div>
  );
}
