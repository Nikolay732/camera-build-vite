import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/product-list-data/product-list-data-selectors';
import { setCurrentPage } from '../../store/product-list-data/product-list-data-slice';
import { PaginationItem } from '../pagination-item/pagination-item';
import { Link } from 'react-router-dom';

type PaginationProps = {
  totalCountPage: number;
}

export function Pagination ({totalCountPage}: PaginationProps) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);
  const pageAllNumbers = [...Array(totalCountPage).keys()];
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 2;
  const currentPageNumbers = pageAllNumbers.slice(prevPage, nextPage);
  const isHidenClassPrevLink = currentPage === 1 || totalCountPage <= 3;
  const isHidenClassNextLink = currentPage + 1 === totalCountPage || currentPage === totalCountPage;
  const hanldeNextPageClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevPageClick = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

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
