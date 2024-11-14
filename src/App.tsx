import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm/SearchForm';
import MainPAge from './containers/MainPage/MainPAge.tsx';
import Header from './components/Header/Header.tsx';

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/shows/:id" element={<MainPAge />} />
        <Route path="*" element={<p>page is not found</p>} />
      </Routes>
    </>
  );
};

export default App;