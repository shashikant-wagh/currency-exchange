import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-white shadow-sm py-0 lh-lg text-danger">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span className="material-icons text-primary align-text-bottom pe-1">
              autorenew
            </span>
            Currency<b>Exchange</b>
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
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link text-uppercase ${
                    pathname === "/"
                      ? "active border-bottom border-primary border-2"
                      : ""
                  }`}
                  to="/"
                >
                  Currency Converter
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link text-uppercase ${
                    pathname === "/history"
                      ? "active border-bottom border-primary border-2"
                      : ""
                  }`}
                  to="/history"
                >
                  View Conversion History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
