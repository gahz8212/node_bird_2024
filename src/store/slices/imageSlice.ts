import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  image: FormData | null;
  status: { message: string; loading: boolean };
};
const initialState: State = {
  image: null,
  status: { message: "", loading: false },
};
const imageSelector = (state: RootState) => {
  return state.images.image;
};
export const imageData = createSelector(imageSelector, (image) => ({ image }));
const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<{ image: FormData }>) => {
      state.image = null;
      state.status.message = "";
      state.status.loading = true;
    },
    addImageSuccess: (state, { payload: image }) => {
      state.image = image;
      state.status.message = "image_add_ok";
      state.status.loading = false;
    },
    addImageFailure: (state, { payload: error }) => {
      state.image = null;
      state.status.message = error;
      state.status.loading = false;
    },
  },
});
export default imageSlice.reducer;
export const imageActions = imageSlice.actions;
