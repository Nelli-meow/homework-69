interface IFilm {
  title: string,
  description: string,
  img: string,
  id?: string,
}

interface IFilmAPI {
  [id: string]: IFilm;
}
