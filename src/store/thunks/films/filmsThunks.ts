import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../../axiosAPI.ts';

export const searchNewFilm = createAsyncThunk<void, IFilmForm>(
  'films/searchNewFilm',
  async (filmToSearch) => {
    await axiosAPI.post('films.json', {...filmToSearch});
  }
);

export const fetchAllFilms = createAsyncThunk<IFilm[], void >(
  'films/fetchAllFilms',
  async () => {
    const response = await axiosAPI<IFilmAPI>(`http://api.tvmaze.com/search/shows?q=`);

    if(response.data) {
      const filmsInObj = response.data;
      return Object.keys(filmsInObj).map((filmId) => {
        return {
          ...filmsInObj[filmId],
          id: filmId,
        }
      });
    }

    return [];
  }
)