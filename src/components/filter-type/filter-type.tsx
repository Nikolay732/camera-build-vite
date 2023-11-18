import { ProductCategoryValue, ProductTypeValue } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilterCategory, getFilterType } from '../../store/catalog-process/catalog-process-selectors';
import { setFilterType } from '../../store/catalog-process/catalog-process-slice';
import { ProductType } from '../../types/product';

export function FilterType () {
  const dispatch = useAppDispatch();
  const currentType = useAppSelector(getFilterType);
  const isActiveCategoryVideo = useAppSelector(getFilterCategory) === ProductCategoryValue.VideoCamera;
  const handleInputTypeChange = (type: ProductType) => {
    dispatch(setFilterType(type));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {Object.entries(ProductTypeValue).map(([type, value]) => {
        const isTypeDisabled = isActiveCategoryVideo && (value === ProductTypeValue.Snapshot || value === ProductTypeValue.Film);
        return (
          <div className="custom-checkbox catalog-filter__item" key={type}>
            <label>
              <input
                type="checkbox"
                name={type.toLowerCase()}
                checked={currentType.includes(value)}
                disabled={isTypeDisabled}
                onChange={() => handleInputTypeChange(value)}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">{value}</span>
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
