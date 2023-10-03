import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCamerasList = (state: State) => state[NameSpace.Cameras].CamerasList;
