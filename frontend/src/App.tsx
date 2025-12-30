import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Inspiration from "./pages/Inspiration";
import MyMailbox from "./pages/MyMailbox";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import { isAuthenticated, logout } from "./services/authClient";
import SignIn from "./pages/SignIn";
import "./styles/App.css";

export default function App() {
  const handleLogout = async () => {
    await logout();
    // Force a reload to reflect auth state changes in UI
    window.location.href = "/";
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
                <Link to="/get-started">Get Started</Link>
              </li>
              <li>
                <Link to="/inspiration">Inspiration</Link>
              </li>
              <li>
                <Link to="/resources">Resources</Link>
              </li>
              <li>
                <Link to="/community">Community</Link>
              </li>
              {isAuthenticated() && (
                <li>
                  <Link to="/mailbox">My Mailbox</Link>
                </li>
              )}
              {isAuthenticated() ? (
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
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/community" element={<Community />} />
            <Route
              path="/mailbox"
              element={
                isAuthenticated() ? <MyMailbox /> : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={<SignIn />} />
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
