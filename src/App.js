import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ImageSlider from "./components/ImageSlider";
import MovieDetail from "./pages/MovieDetail";
import MovieListPage from "./pages/MovieListPage";
import AuthForm from "./components/AuthForm";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";
import "./assets/styles.css";

const App = () => {
  // State để lưu thông tin người dùng đã đăng nhập
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      {/* Truyền thông tin người dùng đã đăng nhập xuống Navbar */}
      <Navbar loggedInUser={loggedInUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imageSlider" element={<ImageSlider />} />
        <Route
          path="/authform"
          element={<AuthForm setLoggedInUser={setLoggedInUser} />}
        />
        <Route path="/movies" element={<MovieListPage />} />
        <Route path="/movies/:genre" element={<MovieListPage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        {/* Truyền loggedInUser vào AdminPage */}
        <Route path="/admin" element={<AdminPage loggedInUser={loggedInUser} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
