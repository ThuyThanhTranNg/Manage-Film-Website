import React, { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import { getMovies, deleteMovie, updateMovie } from "../services/movieService";

const ActionPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchActionMovies();
  }, []);

  const fetchActionMovies = async () => {
    try {
      const allMovies = await getMovies();
      // Lọc phim thuộc thể loại Action
      const actionMovies = allMovies.filter((movie) => movie.genre === "action");
      setMovies(actionMovies);
    } catch (error) {
      console.error("Lỗi khi tải phim hành động:", error);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này không?")) {
      try {
        await deleteMovie(id);
        setMovies(movies.filter((movie) => movie.id !== id));
      } catch (error) {
        alert("Lỗi khi xóa phim");
      }
    }
  };

  const handleEditMovie = async (updatedMovie) => {
    try {
      await updateMovie(updatedMovie);
      setMovies(movies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      ));
      alert("Cập nhật thành công!");
    } catch (error) {
      alert("Lỗi khi cập nhật");
    }
  };

  return (
    <div>
      <h1>Action Movies</h1>
      <MovieList
        movies={movies}
        onDelete={handleDeleteMovie}
        onEdit={handleEditMovie}
      />
    </div>
  );
};

export default ActionPage;
