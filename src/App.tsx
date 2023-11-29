import { useEffect, useState } from "react";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Home from "./pages/Header";
import Services from "./pages/Services";
import { ArrowUpward } from "@mui/icons-material";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [showScroll, setShowScroll] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Router>
        <main>
          <Home />
          <Blog />
          <About />
          <Services />
          <Portfolio />
          <Contact />
          <div
            className={
              showScroll
                ? `flex justify-end sticky bottom-2 z-10 mr-2 mb-2`
                : ""
            }
          >
            <button
              className=" bg-blue-300 rounded-full p-3"
              onClick={handleBackToTop}
            >
              <ArrowUpward />
            </button>
          </div>
          <footer>
            <Footer />
          </footer>
        </main>
      </Router>
    </>
  );
}

export default App;
