import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPage } from '../../store/product-data/product-data-slice';
import { getSelectedPage } from '../../store/product-data/product-data-selectors';

type PaginationItemProps = {
  pageNumber: number;
}

export function PaginationItem ({pageNumber}: PaginationItemProps) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getSelectedPage);
  const handleLinkClick = () => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <li className="pagination__item">
      <Link
        className={classNames('pagination__link', {'pagination__link--active' : currentPage === pageNumber})}
        to={`?page=${pageNumber}`}
        onClick={handleLinkClick}
      >
        {pageNumber}
      </Link>
    </li>
  );
}
