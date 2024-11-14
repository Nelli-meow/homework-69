import * as React from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAddFilmLoading } from '../../store/slices/FilmsSlice.ts';
import { searchNewFilm } from '../../store/thunks/films/filmsThunks.ts';

const initialStateToForm = {
  title: '',
  status: false,
}

const SearchForm = () => {
  const searchLoading = useAppSelector(selectAddFilmLoading);
  const dispatch = useAppDispatch();
  const [film, setFilm] = useState<IFilmForm>(initialStateToForm);

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilm(prevState => ({
      ...prevState,
      [name]: value
    }));

  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(searchNewFilm({...film}));
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <div className="input-group mb-3">
          <label htmlFor="search" className="me-3">Search for TV show:</label>
          <input
            value={film.title}
            name="title"
            type="text"
            className="form-control"
            onChange={onChangeField}
            aria-describedby="button-addon1"/>
          <button
            className="btn btn-outline-secondary"
            type="submit"
           >Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
