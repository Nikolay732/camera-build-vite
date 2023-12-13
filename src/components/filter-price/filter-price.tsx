import { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilterMaxPrice, getFilterMinPrice, getFilterResetStatus, getFilteredProductList } from '../../store/catalog-process/catalog-process-selectors';
import { getProductList } from '../../store/product-list-data/product-list-data-selectors';
import { getMaxPrice, getMinPrice} from '../../utils';
import { setMaxPrice, setMinPrice } from '../../store/catalog-process/catalog-process-slice';
import { KeyCode } from '../../const';

export function FilterPrice () {
  const dispatch = useAppDispatch();
  const isResetFilters = useAppSelector(getFilterResetStatus);
  const productList = useAppSelector(getProductList);
  const filteredProductList = useAppSelector(getFilteredProductList);
  const currentMinPrice = useAppSelector(getFilterMinPrice);
  const currentMaxPrice = useAppSelector(getFilterMaxPrice);

  const minPrice = getMinPrice(filteredProductList);
  const maxPrice = getMaxPrice(filteredProductList);

  const minPriceAll = getMinPrice(productList);
  const maxPriceAll = getMaxPrice(productList);

  const [minPriceValue, setMinPriceValue] = useState(0 || currentMinPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(0 || currentMaxPrice);

  useEffect(() => {
    if (isResetFilters) {
      setMinPriceValue(0);
      setMaxPriceValue(0);
    }
  }, [isResetFilters]);

  const handleInputMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = Number(evt.target.value.replaceAll('-', ''));
    if (evt.target.value === '') {
      setMinPriceValue(minPriceAll);
      dispatch(setMinPrice(0));
    }
    setMinPriceValue(price);
  };

  const handleInputMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = Number(evt.target.value.replaceAll('-', ''));
    if (evt.target.value === '') {
      setMaxPriceValue(maxPriceAll);
      dispatch(setMaxPrice(0));
    }
    setMaxPriceValue(price);
  };

  const checkMinPrice = () => {
    if (!minPriceValue) {
      setMinPriceValue(0);
      dispatch(setMinPrice(0));
      return;
    }
    if (minPriceValue < minPrice) {
      setMinPriceValue(minPrice);
      dispatch(setMinPrice(minPrice));
      return;
    }
    if (minPriceValue > maxPrice) {
      setMinPriceValue(maxPrice);
      dispatch(setMinPrice(maxPrice));
      return;
    }
    dispatch(setMinPrice(minPriceValue));
  };

  const checkMaxPrice = () => {
    if (!maxPriceValue) {
      setMaxPriceValue(0);
      dispatch(setMaxPrice(0));
      return;
    }
    if (maxPriceValue > maxPrice) {
      setMaxPriceValue(maxPrice);
      dispatch(setMaxPrice(maxPrice));
      return;
    }
    if (maxPriceValue < minPriceValue) {
      setMaxPriceValue(minPriceValue);
      dispatch(setMaxPrice(minPriceValue));
      return;
    }
    dispatch(setMaxPrice(maxPriceValue));
  };

  const handleInputMinPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    checkMinPrice();
    if (minPriceValue !== 0) {
      evt.target.value = minPriceValue.toString();
    }
  };

  const handleInputMaxPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    checkMaxPrice();
    if (maxPriceValue !== 0) {
      evt.target.value = maxPriceValue.toString();
    }
  };

  const handleInputMinPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === KeyCode.Enter) {
      checkMinPrice();
    }
  };

  const handleInputMaxPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === KeyCode.Enter) {
      checkMaxPrice();
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder="от"
              min={Number.MIN_VALUE}
              onChange={handleInputMinPriceChange}
              onKeyDown={handleInputMinPriceKeyDown}
              onBlur={handleInputMinPriceBlur}
              value={minPriceValue || ''}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder="до"
              min={Number.MIN_VALUE}
              onChange={handleInputMaxPriceChange}
              onKeyDown={handleInputMaxPriceKeyDown}
              onBlur={handleInputMaxPriceBlur}
              value={maxPriceValue || ''}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
