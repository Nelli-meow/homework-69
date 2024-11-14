import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../../axiosAPI.ts';

export const searchNewFilm = createAsyncThunk<void, IFilmForm>(
  'films/searchNewFilm',
  async (filmToSearch) => {
    await axiosAPI.post('films.json', {...filmToSearch});
  }
)