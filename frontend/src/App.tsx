import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Inspiration from "./pages/Inspiration";
import MyMailbox from "./pages/MyMailbox";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import { isAuthenticated, logout } from "./services/authClient";
import SignIn from "./pages/SignIn";
import OAuthCallback from "./pages/OAuthCallback";
import ResourcesMain from "./pages/resources/ResourcesMain";
import GettingStartedResources from "./pages/resources/GettingStartedResources";
import DesignAndCraftResources from "./pages/resources/DesignAndCraftResources";
import SendingInternationalResources from "./pages/resources/SendingInternationalResources";
import ArchivingAndPreservationResources from "./pages/resources/ArchivingAndPreservationResources";
import FamousLetters from "./pages/inspiration/FamousLetters";
import "./styles/App.css";

export default function App() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [inspirationOpen, setInspirationOpen] = useState(false);
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
              <li
                className="dropdown"
                onMouseLeave={() => setInspirationOpen(false)}
              >
                <div className="dropdown-header">
                  <Link
                    to="/inspiration"
                    className="dropdown-root"
                    onClick={() => setInspirationOpen(false)}
                  >
                    Inspiration
                  </Link>
                  <button
                    className="dropdown-toggle"
                    aria-haspopup="true"
                    aria-expanded={inspirationOpen}
                    aria-label="Toggle Inspiration menu"
                    onClick={() => setInspirationOpen(!inspirationOpen)}
                  >
                    ▾
                  </button>
                </div>
                <ul
                  className={`dropdown-menu ${inspirationOpen ? "open" : ""}`}
                >
                  <li>
                    <Link
                      to="/inspiration/famous-letters"
                      onClick={() => setInspirationOpen(false)}
                    >
                      Famous Letters
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className="dropdown"
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <div className="dropdown-header">
                  <Link
                    to="/resources"
                    className="dropdown-root"
                    onClick={() => setResourcesOpen(false)}
                  >
                    Resources
                  </Link>
                  <button
                    className="dropdown-toggle"
                    aria-haspopup="true"
                    aria-expanded={resourcesOpen}
                    aria-label="Toggle Resources menu"
                    onClick={() => setResourcesOpen(!resourcesOpen)}
                  >
                    ▾
                  </button>
                </div>
                <ul className={`dropdown-menu ${resourcesOpen ? "open" : ""}`}>
                  <li>
                    <Link
                      to="/resources/getting-started"
                      onClick={() => setResourcesOpen(false)}
                    >
                      Getting Started
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/resources/design-and-craft"
                      onClick={() => setResourcesOpen(false)}
                    >
                      Design & Craft
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/resources/sending-international"
                      onClick={() => setResourcesOpen(false)}
                    >
                      Sending International
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/resources/archiving-and-preservation"
                      onClick={() => setResourcesOpen(false)}
                    >
                      Archiving & Preservation
                    </Link>
                  </li>
                </ul>
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
            <Route path="/resources" element={<Resources />}>
              <Route index element={<ResourcesMain />} />
              <Route
                path="getting-started"
                element={<GettingStartedResources />}
              />
              <Route
                path="design-and-craft"
                element={<DesignAndCraftResources />}
              />
              <Route
                path="sending-international"
                element={<SendingInternationalResources />}
              />
              <Route
                path="archiving-and-preservation"
                element={<ArchivingAndPreservationResources />}
              />
            </Route>
            <Route
              path="/inspiration/famous-letters"
              element={<FamousLetters />}
            />
            <Route path="/community" element={<Community />} />
            <Route
              path="/mailbox"
              element={
                isAuthenticated() ? <MyMailbox /> : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={<SignIn />} />
            <Route path="/auth/callback" element={<OAuthCallback />} />
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
