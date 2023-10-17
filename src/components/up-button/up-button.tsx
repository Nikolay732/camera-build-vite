import { Link } from 'react-router-dom';

export function UpButton () {
  return (
    <Link
      className="up-btn"
      to="#header"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </Link>
  );
}
