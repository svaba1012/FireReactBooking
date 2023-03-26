import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";

function Header() {
  return (
    <nav
      className="navbar sticky-top navbar-expand-lg bg-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h3>
            <i className="fa-brands fa-react fa-spin text-primary"></i>
            <span className="text-warning">Fire</span>
            <span className="text-primary">React</span>
            <span className="text-warning">Booking</span>
          </h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li></li>
          </ul>
          <div
            className="nav-item "
            style={{ justifyContent: "right", marginRight: "10px" }}
          >
            <Link to="/register-room" style={{ textDecoration: "none" }}>
              {" "}
              <h5 className="text-primary">Registruj smestaj</h5>
            </Link>
          </div>
          <div className="nav-item " style={{ justifyContent: "right" }}>
            <Auth />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
