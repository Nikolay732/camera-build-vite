import { Helmet } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { fetchProductListAction } from '../../store/product-list-data/product-list-data-thunk';
import './error-page.css';

export function ErrorPage () {
  const dispatch = useAppDispatch();
  return (
    <div className="wrapper">
      <Helmet>
        <title>Error page</title>
      </Helmet>
      <Header/>
      <main>
        <div className="page-content">
          <section className="catalog">
            <div className="container error">
              <h1 className="title title--h2">Ошибка загрузки данных</h1>
              <button
                className='btn'
                type='button'
                onClick={() => {
                  dispatch(fetchProductListAction());
                }}
              >
                Попробовать ещё раз
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
