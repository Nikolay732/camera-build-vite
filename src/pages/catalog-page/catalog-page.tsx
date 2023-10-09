import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { CatalogAside } from '../../components/catalog-aside/catalog-aside';
import { CataloSort } from '../../components/catalog-sort/catalog-sort';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Pagination } from '../../components/pagination/pagination';
import { ProductCardList } from '../../components/product-card-list/product-card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage, getProductList, getPromoList} from '../../store/product-data/product-data-selectors';
import {useEffect} from 'react';
import { fetchProductListAction, fetchPromoListAction } from '../../store/product-data/product-data-thunk';
import { PER_PAGE } from '../../const';
import { BannerSwiper } from '../../components/banner-swiper/banner-swiper';


export function CatalogPage () {
  const dispatch = useAppDispatch();
  const productList = useAppSelector(getProductList);
  const promoList = useAppSelector(getPromoList);
  const currentPage = useAppSelector(getCurrentPage);
  const totalCountProduct = productList.length;
  const totalCountPage = Math.ceil(totalCountProduct / PER_PAGE);
  const lastProductIndex = currentPage * PER_PAGE;
  const firstProductIndex = lastProductIndex - PER_PAGE;
  const currentProductList = productList.slice(firstProductIndex, lastProductIndex);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchProductListAction());
      dispatch(fetchPromoListAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <BannerSwiper promoList={promoList}/>
        <div className="page-content">
          <Breadcrumbs/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <CatalogAside/>
                <div className="catalog__content">
                  <CataloSort/>
                  <ProductCardList productList={currentProductList}/>
                  {totalCountPage > 1 && <Pagination totalCountPage={totalCountPage}/>}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
