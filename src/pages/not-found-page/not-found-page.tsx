import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export function NotFoundPage () {
  return (
    <div className="wrapper">
      <h2 className='title title---h2'>404 Not Found</h2>
      <Link to={AppRoute.Catalog}>Вернуться на главную страницу</Link>
    </div>
  );
}
