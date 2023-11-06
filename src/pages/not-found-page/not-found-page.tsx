import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { setCurrentPage } from '../../store/product-list-data/product-list-data-slice';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import './not-found-page.css';

export function NotFoundPage () {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(setCurrentPage(1));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Catalog</title>
      </Helmet>
      <Header/>
      <main>
        <div className="page-content">
          <section className="catalog">
            <div className="container not-found">
              <h1 className="title title--h2">404 Not Found</h1>
              <Link className='btn' to={AppRoute.Catalog}>Вернуться на главную страницу</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
