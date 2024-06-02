import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Card from "../components/Card";

const LikePage = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      const moviesId = window.localStorage.movies
        ? window.localStorage.movies.split(",")
        : [];

      const requests = moviesId.map((id) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`
        )
      );

      try {
        const responses = await Promise.all(requests);
        const moviesData = responses.map((res) => res.data);
        setListData(moviesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMoviesData();
  }, []);

  return (
    <div className="user-list-page">
      <Header />
      <h2>
        Coups de coeur <span>💖</span>
      </h2>
      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => <Card movie={movie} key={movie.id} />)
        ) : (
          <h2>Aucun coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default LikePage;
