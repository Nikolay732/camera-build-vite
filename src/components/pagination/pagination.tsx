import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/product-list-data/product-list-data-selectors';
import { setCurrentPage } from '../../store/product-list-data/product-list-data-slice';
import { PaginationItem } from '../pagination-item/pagination-item';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Page } from '../../const';

type PaginationProps = {
  totalCountPage: number;
}

export function Pagination ({totalCountPage}: PaginationProps) {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const pageNumberURL = searchParams.get('page');
  const pageState = useAppSelector(getCurrentPage);
  const currentPage = pageNumberURL ? Number(pageNumberURL) : pageState;
  const pageAllNumbers = [...Array(totalCountPage).keys()];
  const perPageNumber = Math.ceil(currentPage / Page.MaxPagesCount);
  const lastPageIndex = perPageNumber * Page.MaxPagesCount;
  const firstPageIndex = lastPageIndex - Page.MaxPagesCount;
  const currentPageNumbers = pageAllNumbers.slice(firstPageIndex, lastPageIndex);
  const isHidenClassPrevLink = currentPage === 1 || totalCountPage <= 3;
  const isHidenClassNextLink = currentPage === totalCountPage;

  const hanldeNextPageClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevPageClick = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(setCurrentPage(currentPage));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, currentPage]);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item" style={{visibility: `${isHidenClassPrevLink ? 'hidden' : 'visible'}`}}>
          <Link className="pagination__link pagination__link--text" to={`?page=${currentPage - 1}`} onClick={handlePrevPageClick}>Назад</Link>
        </li>
        {currentPageNumbers.map((pageNumber) => <PaginationItem key={pageNumber + 1} pageNumber={pageNumber + 1}/>)}
        <li className="pagination__item" style={{visibility: `${isHidenClassNextLink ? 'hidden' : 'visible'}`}}>
          <Link className="pagination__link pagination__link--text" to={`?page=${currentPage + 1}`} onClick={hanldeNextPageClick}>Далее</Link>
        </li>
      </ul>
    </div>
  );
}
