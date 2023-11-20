import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/catalog-process/catalog-process-selectors';
import { setCurrentPage } from '../../store/catalog-process/catalog-process-slice';

type PaginationItemProps = {
  pageNumber: number;
}

export function PaginationItem ({pageNumber}: PaginationItemProps) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);
  const handleLinkClick = () => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <li className="pagination__item">
      <Link
        className={classNames('pagination__link', {'pagination__link--active' : currentPage === pageNumber})}
        to='#'
        onClick={handleLinkClick}
      >
        {pageNumber}
      </Link>
    </li>
  );
}
