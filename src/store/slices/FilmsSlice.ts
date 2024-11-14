import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchNewFilm } from '../thunks/films/filmsThunks';
import { RootState } from '../../app/store';

interface filmState {
  films: IFilm[],
  loadings: {
    searching: boolean,
  }
}

const initialState: filmState = {
  films: [],
  loadings: {
    searching: false,
  }
};

export const selectAllFilms = (state: RootState) => state.films.films;

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchNewFilm.pending, (state) => {
        state.loadings.searching = true;
      })
      .addCase(searchNewFilm.fulfilled, (state, action) => {
        state.loadings.searching = false;
        state.films = action.payload;
      })
      .addCase(searchNewFilm.rejected, (state) => {
        state.loadings.searching = false;
      });
  },
});

export const filmReducer = filmsSlice.reducer;
