import React from "react";
import "./CSS/NavBar.css";

function NavBar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-icon"></div>
      <div className="navbar-menu">
        <ul>
          <li>Register</li>
          <li>Login</li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
