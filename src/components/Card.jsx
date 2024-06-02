import React from "react";

const Card = ({ movie }) => {
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const genreFinder = () => {
    const genreMapping = {
      28: "Action",
      12: "Aventure",
      16: "Animation",
      35: "Comédie",
      80: "Policier",
      99: "Documentaire",
      18: "Drame",
      10751: "Famille",
      14: "Fantasy",
      36: "Histoire",
      27: "Horreur",
      10402: "Musique",
      9648: "Mystère",
      10749: "Romance",
      878: "Science-fiction",
      10770: "Téléfilm",
      53: "Thriller",
      10752: "Guerre",
      37: "Western",
    };

    return movie.genre_ids.map((id) => <li key={id}>{genreMapping[id]}</li>);
  };

  const addStorage = () => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    if (!storedData.includes(movie.id.toString())) {
      storedData.push(movie.id.toString());
      window.localStorage.movies = storedData.join(",");
    }
  };

  const deleteStorage = () => {
    let storedData = window.localStorage.movies.split(",");
    let newData = storedData.filter((id) => id !== movie.id.toString());

    window.localStorage.movies = newData.join(",");
  };

  return (
    <div className="card">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/original/" + movie.poster_path
            : "./img/poster.jpg"
        }
        alt={`affiche ${movie.title}`}
      />
      <h2>{movie.title}</h2>
      {movie.release_date ? (
        <h5>Sorti le : {dateFormater(movie.release_date)}</h5>
      ) : null}
      <h4>
        {movie.vote_average.toFixed(1)}/10 <span>⭐</span>
      </h4>

      <ul>
        {movie.genre_ids
          ? genreFinder()
          : movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
      </ul>

      {movie.overview && <h3>Synopsis</h3>}
      <p>{movie.overview}</p>
      {movie.genre_ids ? (
        <div className="btn" onClick={addStorage}>
          Ajouter aux coups de coeur
        </div>
      ) : (
        <div
          className="btn"
          onClick={() => {
            deleteStorage();
            window.location.reload();
          }}
        >
          Supprimer de la liste
        </div>
      )}
    </div>
  );
};

export default Card;
