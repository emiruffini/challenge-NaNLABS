import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectorState } from './selector.type';

const initialState: SelectorState = {
  selectedImage: { name: '', url: '' },
  entitiesAreLoading: false,
};

export const selectorSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setSelectedImage: (
      state: SelectorState,
      action: PayloadAction<{ name: string; url: string }>
    ) => {
      state.selectedImage = action.payload;
    },
    resetSelectedImage: (state: SelectorState) => {
      state.selectedImage = { name: '', url: '' };
    },
    setLoading: (state: SelectorState) => {
      state.entitiesAreLoading = !state.entitiesAreLoading;
    },
  },
});

export const { setSelectedImage, resetSelectedImage, setLoading } = selectorSlice.actions;
export default selectorSlice.reducer;
