import { useMemo, useState, useRef, ChangeEvent, useEffect, useCallback, memo } from 'react';
import { useAppSelector } from '../../hooks';
import { getProductList } from '../../store/product-list-data/product-list-data-selectors';
import { MemoSearchSelectItem} from '../search-select-item/search-select-item';
import { useNavigate } from 'react-router-dom';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeyPress } from '../../hooks/use-key-press';
import { AppRoute, DROPDOWN_COUNT, KeyCode, MIN_LENGTH_FOR_SEARCH } from '../../const';
import classNames from 'classnames';
import ReactFocusLock from 'react-focus-lock';

function SearchForm () {
  const productList = useAppSelector(getProductList);
  const [searchValue, setSearchValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);

  const searchProductList = useMemo(() =>
    productList.filter((product) =>
      product.name.toLowerCase()
        .includes(searchValue.toLowerCase())
        && searchValue.length >= MIN_LENGTH_FOR_SEARCH),
  [productList, searchValue]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useOutsideClick(formRef, () => setSearchValue(''));

  const handleResetInput = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };

  const handleSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
  };

  const arrowUp = useKeyPress({targetKey: KeyCode.ArrowUp});
  const arrowDown = useKeyPress({targetKey: KeyCode.ArrowDown});
  const escKey = useKeyPress({targetKey:KeyCode.Esc});
  const isUpArrowPressed = searchValue && searchProductList.length && arrowUp;
  const isDownArrowPressed = searchValue && searchProductList.length && arrowDown;
  const isEscPressed = searchValue && escKey;

  useEffect(() => {
    if (searchProductList.length && isUpArrowPressed) {
      setCurrentIndex((prev) => prev ? prev - 1 : prev);
      if (!currentIndex) {
        inputRef.current?.focus();
        setCurrentIndex(-1);
      }
    }
    if (searchProductList && isDownArrowPressed) {
      setCurrentIndex((prev) => prev < searchProductList.length - 1 ? prev + 1 : prev);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpArrowPressed, isDownArrowPressed, searchProductList.length]);

  useEffect (() => {
    if (isEscPressed) {
      handleResetInput();
    }
  }, [isEscPressed, searchProductList]);

  const onSearchProductClick = useCallback((cameraId: number) => {
    navigate(`${AppRoute.Product}/${cameraId}`);
    handleResetInput();
  }, [navigate]);

  return (
    <div
      className={classNames('form-search', {'list-opened': searchValue.length})}
      ref={formRef}
      tabIndex={-1}
    >
      <ReactFocusLock disabled={!searchValue}>
        <form>
          <label>
            <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-lens"></use>
            </svg>
            <input
              className="form-search__input"
              type="text" autoComplete="off"
              placeholder="Поиск по сайту"
              onChange={handleSearchInput}
              ref={inputRef}
              value={searchValue}
            />
          </label>
          <ul
            className={classNames(
              'form-search__select-list',
              {'hidden': !searchProductList.length},
              {'scroller' : searchProductList.length > DROPDOWN_COUNT})}
          >
            {searchProductList.map((product, index) => {
              const isCurrent = index === currentIndex;
              return (
                <MemoSearchSelectItem
                  key={product.id}
                  product={product}
                  isCurrent={isCurrent}
                  onClick={onSearchProductClick}
                />
              );
            })}
          </ul>
        </form>
        <button className="form-search__reset" type="reset" onClick={handleResetInput}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg><span className="visually-hidden">Сбросить поиск</span>
        </button>
      </ReactFocusLock>
    </div>
  );
}

export const MemoSearchForm = memo(SearchForm);
