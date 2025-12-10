import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Inspiration from "./pages/Inspiration";
import MyMailbox from "./pages/MyMailbox";
import Home from "./pages/Home";
import { isAuthenticated, logout } from "./services/authClient";
import "./styles/App.css";

export default function App() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  const handleLogout = async () => {
    await logout();
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <nav className="main-nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              Snail Mail
            </Link>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/inspiration">Inspiration</Link>
              </li>
              {authenticated && (
                <li>
                  <Link to="/mailbox">My Mailbox</Link>
                </li>
              )}
              {authenticated ? (
                <li>
                  <button onClick={handleLogout} className="nav-button">
                    Sign Out
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="nav-button">
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route
              path="/mailbox"
              element={authenticated ? <MyMailbox /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="main-footer">
          <p>
            &copy; 2025 Bring Back Snail Mail. Encouraging the art of physical
            correspondence.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Return Home</Link>
    </div>
  );
}
