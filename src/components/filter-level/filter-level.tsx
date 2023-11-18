import { ProductLevelValue } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilterLevel } from '../../store/catalog-process/catalog-process-selectors';
import { setFilterLevel } from '../../store/catalog-process/catalog-process-slice';
import { ProductLevel } from '../../types/product';

export function FilterLevel () {
  const dispatch = useAppDispatch();
  const currentLevel = useAppSelector(getFilterLevel);

  const handleInputLevelChange = (level: ProductLevel) => {
    dispatch(setFilterLevel(level));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {Object.entries(ProductLevelValue).map(([key, value]) => (
        <div className="custom-checkbox catalog-filter__item" key={key}>
          <label>
            <input
              type="checkbox"
              name={key.toLowerCase()}
              checked={currentLevel.includes(value)}
              onChange={() => handleInputLevelChange(value)}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{value}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
