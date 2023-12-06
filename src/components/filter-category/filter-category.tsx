import { ProductCategoryValue } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilterCategory } from '../../store/catalog-process/catalog-process-selectors';
import { setFilterCategory } from '../../store/catalog-process/catalog-process-slice';
import { ProductCategory } from '../../types/product';

export function FilterCategory () {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(getFilterCategory);
  const hanleCategoryInputChange = (type: ProductCategory) => {
    if (currentCategory !== type) {
      dispatch(setFilterCategory(type));
    } else {
      dispatch(setFilterCategory(null));
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {Object.entries(ProductCategoryValue).map(([type, value]) => (
        <div className="custom-checkbox catalog-filter__item" key={type}>
          <label>
            <input
              type="checkbox"
              name={type.toLowerCase()}
              checked={currentCategory === value}
              onChange={() => hanleCategoryInputChange(value)}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">
              {value === ProductCategoryValue.VideoCamera ? value : 'Фотокамера'}
            </span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
