import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllFilms, searchNewFilm } from '../thunks/films/filmsThunks.ts';
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
export const selectFetchFilmLoading = (state: RootState) => state.films.loadings.fetching;
export const selectAllFilms = (state: RootState) => state.films;

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchNewFilm.pending, (state) => {
        state.loadings.searching = true;
      })
      .addCase(searchNewFilm.fulfilled, (state ) => {
        state.loadings.searching = false;
      })
      .addCase(searchNewFilm.rejected, (state) => {
        state.loadings.searching = false;
      })
      .addCase(fetchAllFilms.pending, (state) => {
        state.loadings.fetching = true;
      })
      .addCase(fetchAllFilms.fulfilled, (state, action: PayloadAction<IFilm[]>) => {
        state.loadings.fetching = false;
        state.films.actions.payload;
      })
      .addCase(fetchAllFilms.rejected, (state) => {
        state.loadings.fetching = false;
      })
  }
});

export const filmReducer = filmsSlice.reducer;
export const {} = filmsSlice.actions;