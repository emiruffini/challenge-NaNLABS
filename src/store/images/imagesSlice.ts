import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImagesState, ChangeType } from './images.type';

const initialState: ImagesState = {
  currentChange: { parameterName: '', parameterValue: '' },
  changesHistory: [],
  positionInHistory: 0,
  entitiesAreLoading: false,
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImageChanges: (state: ImagesState, action: PayloadAction<ChangeType>) => {
      const { parameterName, parameterValue } = action.payload;
      state.currentChange = action.payload;
      state.changesHistory = state.changesHistory.filter(
        (change) => !change.includes(parameterName)
      );
      state.changesHistory.push(`${parameterName}=${encodeURIComponent(parameterValue)}`);
      state.positionInHistory = state.changesHistory.length - 1;
    },
    undoChange: (state: ImagesState) => {
      if (state.positionInHistory > -1) {
        state.positionInHistory = state.positionInHistory - 1;
      }
    },
    redoChange: (state: ImagesState) => {
      if (state.positionInHistory < state.changesHistory.length - 1) {
        state.positionInHistory = state.positionInHistory + 1;
      }
    },
    deleteChange: (state: ImagesState, action: PayloadAction<string>) => {
      state.changesHistory = state.changesHistory.filter(
        (change) => !change.includes(action.payload)
      );
      state.positionInHistory = state.changesHistory.length - 1;
    },
  },
});

export const { 
  setImageChanges,
  undoChange,
  redoChange,
  deleteChange 
} = imagesSlice.actions;
export default imagesSlice.reducer;
