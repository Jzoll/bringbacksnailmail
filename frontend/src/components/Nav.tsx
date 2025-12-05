import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav aria-label="Main navigation">
      <ul
        style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0 }}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/get-started">Get Started</Link>
        </li>
        <li>
          <Link to="/resources">Resources</Link>
        </li>
        <li>
          <Link to="/inspiration">Inspiration</Link>
        </li>
        <li>
          <Link to="/archive">Archive</Link>
        </li>
        <li>
          <Link to="/community">Community</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
