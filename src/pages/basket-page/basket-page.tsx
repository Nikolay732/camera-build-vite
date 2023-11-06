import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { BasketItemList } from '../../components/basket-item-list/basket-item-list';
import { ProductItem } from '../../types/product';
import { BasketSummary } from '../../components/basket-summary/basket-summary';
import { Footer } from '../../components/footer/footer';

export function BasketPage () {

  const basketProductList:ProductItem[] = [];

  return (
    <div className="wrapper">
      <Helmet>
        <title>Catalog</title>
      </Helmet>
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs/>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {basketProductList.map((item) => <BasketItemList key={item.id} product={item}/>)}
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
