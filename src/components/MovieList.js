import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="movie-grid">
      {movies.length === 0 ? (
        <p>No movies available.</p>
      ) : (
        movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <MovieCard movie={movie} />
            {/* Chỉ hiển thị nút Edit và Delete nếu là Admin */}
            {isAdmin && (
              <div className="admin-controls">
                <button
                  className="edit-btn"
                  onClick={() => onEdit(movie)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(movie.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MovieList;
