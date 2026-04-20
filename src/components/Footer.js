import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About MyFlix</h4>
          <p>
            MyFlix offers a vast library of movies across genres. Enjoy your favorite films with high-quality streaming and easy access from anywhere.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/movies">Movies</a></li>
            <li><a href="/authform">Login/Sign Up</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Me</h4>
          <div className="footer-social">
            <a href="https://www.facebook.com/hophong20042005" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://x.com/Ddjjj1231" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/niw.204/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@phongho7936" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MyFlix. All rights reserved. | Designed with ❤️ by MyFlix Team.</p>
      </div>
    </footer>
  );
};

export default Footer;
