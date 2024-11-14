import * as React from 'react';

const SearchForm = () => {
  return (
    <div>
      <form>
        <div className="input-group mb-3">
          <label htmlFor="search" className="me-3">Search for TV show:</label>
          <input type="text" className="form-control" placeholder=""
                 aria-describedby="button-addon1"/>
          <button className="btn btn-outline-secondary" type="button" id="button-addon1">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;