import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { BasketItem } from '../../components/basket-item/basket-item';
import { BasketSummary } from '../../components/basket-summary/basket-summary';
import { Footer } from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import { getBasketProductList } from '../../store/basket-product-data/basket-product-data-selectors';

export function BasketPage () {
  const basketProductList = useAppSelector(getBasketProductList);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Basket</title>
      </Helmet>
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs isBasketPage/>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {basketProductList.map((item) => <BasketItem key={item.product.id} basketProduct={item}/>)}
              </ul>
              <BasketSummary/>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
