import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/AdminPage.css";
function AdminPage() {
  const [isActive, setIsActive] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleSetActiveLink = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div id="body-pd" className={isActive ? "body-pd" : ""}>
      <header className={`header ${isActive ? "body-pd" : ""}`} id="header">
        <div className="header_toggle">
          <i
            className={`bx ${isActive ? "bx-x" : "bx-menu"}`}
            id="header-toggle"
            onClick={handleToggle}
          ></i>
        </div>
      </header>
      <div className={`l-navbar ${isActive ? "show" : ""}`} id="nav-bar">
        <nav className="nav">
          <div>
            <NavLink to="/readmap" className="nav_logo">
              <i className="bx bx-layer nav_logo-icon"></i>
              <span className="nav_logo-name">UniPonti</span>
            </NavLink>
            <div className="nav_list">
              <NavLink
                to="/readmap"
                className={({ isActive }) =>
                  `nav_link ${isActive ? "active" : ""}`
                }
              >
                <i className="bx bx-grid-alt nav_icon"></i>
                <span className="nav_name">Read Map</span>
              </NavLink>
              <NavLink
                to="/createmap"
                className={({ isActive }) =>
                  `nav_link ${isActive ? "active" : ""}`
                }
              >
                <i className="bx bx-user nav_icon"></i>
                <span className="nav_name">Create Map</span>
              </NavLink>
              <NavLink
                to="/editmap"
                className={({ isActive }) =>
                  `nav_link ${isActive ? "active" : ""}`
                }
              >
                <i className="bx bx-message-square-detail nav_icon"></i>
                <span className="nav_name">Edit Map</span>
              </NavLink>
              {/* Add more NavLink components as needed */}
            </div>
          </div>
          <NavLink to="/" className="nav_link">
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default AdminPage;