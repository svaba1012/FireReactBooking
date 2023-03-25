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
            {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li> */}
          </ul>
        </div>
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
    </nav>
  );
}

export default Header;
