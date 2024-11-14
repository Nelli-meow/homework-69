import SearchForm from '../SearchForm/SearchForm.tsx';
import FilmsItem from '../FilmsItem/FilmsItem.tsx';


const MainPAge = () => {
  return (
    <div>
      <div>
        <SearchForm/>
      </div>
      <div className="mt-5">
        <FilmsItem/>
      </div>
    </div>
  );
};

export default MainPAge;