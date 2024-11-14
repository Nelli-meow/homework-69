import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchNewFilm = createAsyncThunk(
  'films/searchNewFilm',
  async (payload: { title: string }) => {
    const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${payload.title}`);
    return response.data.map((item: any) => ({
      id: item.show.id,
      name: item.show.name,
      genres: item.show.genres,
    }));
  }
);