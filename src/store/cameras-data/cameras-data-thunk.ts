import {createAsyncThunk} from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { CameraItem } from '../../types/camera';

export const fetchCamerasAction = createAsyncThunk<CameraItem[], undefined, ThunkAPI> (
  `${NameSpace.Cameras}/fetchCameras`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<CameraItem[]>(APIRoute.Cameras);
    return data;
  },
);

