import { NameSpace } from '../../const';
import { CameraItem } from '../../types/camera';
import {createSlice} from '@reduxjs/toolkit';
import { fetchCamerasAction } from './cameras-data-thunk';

type InitialState = {
  CamerasList: CameraItem[];
};

const initialState: InitialState = {
  CamerasList: [],
};

export const camerasData = createSlice ({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.CamerasList = action.payload;
      });
  }
});


