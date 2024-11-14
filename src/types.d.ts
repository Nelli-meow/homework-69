interface IFilm {
  title: string,
  description: string,
  img: string,
  id?: string,
}

interface IFilmForm {
  title: string,
  status: boolean,
}

interface IFilmAPI {
  [id: string]: IFilm;
}
