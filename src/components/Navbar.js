import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ loggedInUser }) => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/authform"); // Điều hướng đến trang đăng ký/đăng nhập
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* "MyFlix" on the left */}
        <Link to="/" className="brand-name">
          MyFlix
        </Link>

        {/* Genre Links Centered */}
        <div className="navbar-links">
          <Link to="/movies">Movies</Link>
          <Link to="/movies/action">Action</Link>
          <Link to="/movies/sci-fi">Sci-Fi</Link>
          <Link to="/movies/animation">Animation</Link>
          <Link to="/movies/romance">Romance</Link>
        </div>

        {/* User Info or Sign Up Button */}
        <div className="navbar-user">
          {loggedInUser ? (
            <span className="user-info">
              Chào, {loggedInUser.username}!
            </span>
          ) : (
            <button className="signup-link" onClick={handleSignUpClick}>
              Sign up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
