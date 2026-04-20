import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import moviesData from "../data/moviesData"; // Dữ liệu phim

const MovieListPage = () => {
  const { genre } = useParams(); // Lấy thể loại từ URL
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [filteredMovies, setFilteredMovies] = useState([]); // Danh sách phim sau khi lọc

  useEffect(() => {
    // Lọc phim theo thể loại
    let filteredByGenre = moviesData;
    if (genre) {
      filteredByGenre = moviesData.filter(
        (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
      );
    }

    // Lọc phim dựa trên từ khóa tìm kiếm
    const filteredBySearch = filteredByGenre.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMovies(filteredBySearch);
  }, [genre, searchTerm]); // Chạy lại mỗi khi "genre" hoặc "searchTerm" thay đổi

  return (
    <div className="movie-list-page">
      {/* Tiêu đề */}
      <h1>
        {genre
          ? `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`
          : "All Movies"}
      </h1>

      {/* Trường tìm kiếm */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Hiển thị danh sách phim */}
      <div>
        {filteredMovies.length > 0 ? (
          <MovieList movies={filteredMovies} />
        ) : (
          <p>No movies found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;
