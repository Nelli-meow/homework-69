import * as React from 'react';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { searchNewFilm } from '../../store/thunks/films/filmsThunks';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

const initialStateToForm = {
  title: '',
  status: false,
};

const SearchForm = () => {
  const dispatch = useAppDispatch();
  const [film, setFilm] = useState(initialStateToForm);
  const [suggestions, setSuggestions] = useState<{ id: number; name: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const onChangeField = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFilm((prevState) => ({
      ...prevState,
      title: value,
    }));

    if (value) {
      try {
        const response = await fetch(`http://api.tvmaze.com/search/shows?q=${value}`);
        const data = await response.json();
        setSuggestions(data.map((item: any) => ({
          id: item.show.id,
          name: item.show.name,
        })));
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  const handleSuggestionClick = (id: number) => {
    navigate(`/shows/${id}`);
    setShowSuggestions(false);
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchNewFilm({ title: film.title }));
  };

  return (
    <div className="container mt-5">
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
        </div>
      </form>
      {showSuggestions &&  (
        <div
          className="autocomplete-suggestions"
          style={{
            width: '100%',
            border: '1px solid #ccc',
            marginBottom: '10px',
            zIndex: 1,
            backgroundColor: '#fff',
          }}
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="suggestion"
              style={{ padding: '8px', cursor: 'pointer' }}
              onClick={() => handleSuggestionClick(suggestion.id)}
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
