import { createSlice } from '@reduxjs/toolkit';
import { searchNewFilm } from '../thunks/films/filmsThunks.ts';
import { RootState } from '../../app/store.ts';

interface filmState {
  films: IFilm[],
  loadings: {
    fetching: boolean,
    searching: boolean,
  }
}

const initialState: filmState = {
  films: [],
  loadings: {
    fetching: false,
    searching: false,
  }
}

export const selectAddFilmLoading = (state: RootState) => state.films.loadings.searching;

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchNewFilm.pending, (state) => {
        state.loadings.searching = true;
      })
      .addCase(searchNewFilm.fulfilled, (state, ) => {
        state.loadings.searching = false;
      })
      .addCase(searchNewFilm.rejected, (state) => {
        state.loadings.searching = false;
      })
  }
});

export const filmReducer = filmsSlice.reducer;
export const {} = filmsSlice.actions;