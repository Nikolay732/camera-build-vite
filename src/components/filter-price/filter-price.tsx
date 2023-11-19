import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilterMaxPrice, getFilterMinPrice, getFilteredProductList } from '../../store/catalog-process/catalog-process-selectors';
import { getProductList } from '../../store/product-list-data/product-list-data-selectors';
import { getPrice } from '../../utils';
import { setMaxPrice, setMinPrice } from '../../store/catalog-process/catalog-process-slice';
import { KeyCode } from '../../const';

export function FilterPrice () {
  const dispatch = useAppDispatch();

  const productList = useAppSelector(getProductList);
  const filteredProductList = useAppSelector(getFilteredProductList);
  const currentMinPrice = useAppSelector(getFilterMinPrice);
  const currentMaxPrice = useAppSelector(getFilterMaxPrice);

  const minPrice = getPrice(filteredProductList, 'min');
  const maxPrice = getPrice(filteredProductList, 'max');

  const minPriceAll = getPrice(productList, 'min');
  const maxPriceAll = getPrice(productList, 'max');

  const [minPriceValue, setMinPriceValue] = useState(0 || currentMinPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(0 || currentMaxPrice);

  const handleInputMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = Number(evt.target.value.replaceAll('-', ''));
    if (evt.target.value === '') {
      setMinPriceValue(Number(minPriceAll));
      dispatch(setMinPrice(0));
    }
    setMinPriceValue(price);
  };

  const handleInputMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = Number(evt.target.value.replaceAll('-', ''));
    if (evt.target.value === '') {
      setMaxPriceValue(Number(maxPriceAll));
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
    if (minPriceValue < Number(minPrice)) {
      setMinPriceValue(Number(minPrice));
      dispatch(setMinPrice(Number(minPrice)));
      return;
    }
    if (minPriceValue > Number(maxPrice)) {
      setMinPriceValue(Number(maxPrice));
      dispatch(setMinPrice(Number(maxPrice)));
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
    if (maxPriceValue > Number(maxPrice)) {
      setMaxPriceValue(Number(maxPrice));
      dispatch(setMaxPrice(Number(maxPrice)));
      return;
    }
    if (maxPriceValue < minPriceValue) {
      setMaxPriceValue(minPriceValue);
      dispatch(setMaxPrice(minPriceValue));
      return;
    }
    dispatch(setMaxPrice(maxPriceValue));
  };

  const handleInputMinPriceBlur = () => {
    checkMinPrice();
  };

  const handleInputMaxPriceBlur = () => {
    checkMaxPrice();
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
