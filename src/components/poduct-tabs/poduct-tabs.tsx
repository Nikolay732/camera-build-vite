import { useAppSelector } from '../../hooks';
import { getSelectedProduct } from '../../store/product-data/product-data-selectors';
import { ProductItem } from '../../types/product';
import classNames from 'classnames';
import { useState } from 'react';

export function ProductTabs () {
  const product = useAppSelector(getSelectedProduct);
  const {vendorCode, category, type, level, description} = product as ProductItem;
  const [activeDescription, setActiveDescription] = useState<boolean>(true);

  const handleDescriptionButton = () => {
    setActiveDescription(true);
  };

  const handleCharacteristicsButton = () => {
    setActiveDescription(false);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={classNames('tabs__control', {'is-active': !activeDescription})} type="button"
          onClick={handleCharacteristicsButton}
        >
            Характеристики
        </button>
        <button
          className={classNames('tabs__control', {'is-active': activeDescription})} type="button"
          onClick={handleDescriptionButton}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={classNames('tabs__element', {'is-active': !activeDescription})}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text">{` ${vendorCode}`}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div className={classNames('tabs__element', {'is-active': activeDescription})}>
          <div className="product__tabs-text">
            <p>{description.split('.')[0]}</p>
            {description.split('.').length > 1 && <p>{description.split('.').slice(1).join('.')}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
