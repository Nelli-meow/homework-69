import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import axiosAPI from '../../axiosAPI.ts';
import { selectAllFilms } from '../../store/slices/FilmsSlice.ts';

const FilmsItem = () => {
  const { id } = useParams();
  const films = useAppSelector(selectAllFilms);
  const [showDetails, setShowDetails] = useState<any>(null);

  useEffect(() => {
    const film = films.find((film) => film.id === id);
    if (film) {
      setShowDetails(film);
    } else {
      const fetchShowDetails = async () => {
        try {
          const response = await axiosAPI.get(`http://api.tvmaze.com/shows/${id}`);
          setShowDetails(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      if (id) {
        fetchShowDetails();
      }
    }
  }, [id, films]);

  if (!showDetails) {
    return <div>loading...</div>;
  }

  return (
    <div className="container">
      <h1>{showDetails?.name}</h1>
      <p><strong>Genres:</strong> {showDetails?.genres.join(', ')}</p>
      <p><strong>Premiered:</strong> {showDetails?.premiered}</p>
      <p><strong>Status:</strong> {showDetails?.status}</p>
      <p><strong>Summary:</strong> {showDetails?.summary}</p>
      <img src={showDetails?.image?.medium} alt={showDetails?.name} />
    </div>
  );
};

export default FilmsItem;
