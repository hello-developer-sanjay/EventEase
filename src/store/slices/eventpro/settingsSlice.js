import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  color: '#000000',
  fontFamily: 'Arial',
  fontSize: '16px',
  lineHeight: '1.5',
  backgroundImage: null,
  borderRadius: '0px',
  boxShadow: 'none',
};

const settingsSlice = createSlice({
  name: 'eventpro/settings',
  initialState,
  reducers: {
    updateColor(state, action) {
      state.color = action.payload;
    },
    updateFontFamily(state, action) {
      state.fontFamily = action.payload;
    },
    updateFontSize(state, action) {
      state.fontSize = action.payload;
    },
    updateLineHeight(state, action) {
      state.lineHeight = action.payload;
    },
    updateBackgroundImage(state, action) {
      state.backgroundImage = action.payload;
    },
    updateBorderRadius(state, action) {
      state.borderRadius = action.payload;
    },
    updateBoxShadow(state, action) {
      state.boxShadow = action.payload;
    },
  },
});

export const {
  updateColor,
  updateFontFamily,
  updateFontSize,
  updateLineHeight,
  updateBackgroundImage,
  updateBorderRadius,
  updateBoxShadow,
} = settingsSlice.actions;
export default settingsSlice.reducer;