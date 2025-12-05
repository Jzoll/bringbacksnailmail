import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import GetStarted from "./pages/GetStarted";
import Resources from "./pages/Resources";
import Inspiration from "./pages/Inspiration";
import Archive from "./pages/Archive";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import "./styles/base.css";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/inspiration" element={<Inspiration />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
