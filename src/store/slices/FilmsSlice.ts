import { createSlice } from '@reduxjs/toolkit';

interface filmState {
  films: IFilm[],
  loading: {
    fetching: boolean,
    searching: boolean,
  }
}

const initialState: filmState = {
  films: [],
  loading: {
    fetching: false,
    searching: false,
  }
}

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {}
});

export const filmReducer = filmsSlice.reducer;
export const {} = filmsSlice.actions;