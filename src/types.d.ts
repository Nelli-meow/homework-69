interface IFilm {
  name: string,
  description: string,
  img: string,
  id?: string,
  genres: string;
  summary: string;
}

interface IFilmForm {
  name: string,
  status: boolean,
}

interface IFilmAPI {
  [id: string]: IFilm;
}
