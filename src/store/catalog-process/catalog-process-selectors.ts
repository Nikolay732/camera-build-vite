import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getSortType = (state: State) => state[NameSpace.Catalog].sortType;
export const getSortOrder = (state: State) => state[NameSpace.Catalog].sortOrder;

