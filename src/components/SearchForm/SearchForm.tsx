import * as React from 'react';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAddFilmLoading, selectFetchFilmLoading } from '../../store/slices/FilmsSlice.ts';
import {  searchNewFilm } from '../../store/thunks/films/filmsThunks.ts';
import './SearchForm.css';

import axiosAPI from '../../axiosAPI.ts';

const initialStateToForm = {
  title: '',
  status: false,
}

const SearchForm = () => {
  const searchLoading = useAppSelector(selectAddFilmLoading);
  const fetchLoading = useAppSelector(selectFetchFilmLoading);
  const dispatch = useAppDispatch();
  const [film, setFilm] = useState<IFilmForm>(initialStateToForm);
  const [suggestions, setSuggestions] = useState<IFilm[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const onChangeField = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilm(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (value) {
      try {
        const response = await axiosAPI.get<IFilm[]>(`http://api.tvmaze.com/search/shows?q=${value}`);
        const films = response.data.map(item => ({
          id: item.show.id,
          name: item.show.name,
        }));

        setSuggestions(films);
        setShowSuggestions(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

  },[]);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(searchNewFilm({...film}));

  };


  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <div className="input-group mb-3">
          <label htmlFor="search" className="me-3">
            Search for TV show:
          </label>
          <input
            value={film.title}
            name="title"
            type="text"
            className="form-control"
            onChange={onChangeField}
            aria-describedby="button-addon1"
          />
          <button className="btn btn-outline-secondary" type="submit">
            Search
          </button>
        </div>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <div className="autocomplete-suggestions" style={{
          width: '100%',
          border: '1px solid #ccc',
          marginBottom: '10px',
          zIndex: 1
        }}>
          {suggestions.map(suggestion => (
            <div
              className="suggestion"
              key={suggestion.id}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;