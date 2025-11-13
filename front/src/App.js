import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Properties from "./pages/Properties";
import About from "./pages/About";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import axios from "axios";
import Reviews from "./pages/Reviews";
import AllReviews from "./pages/AllReviews";

export const UserContext = createContext();

export const lightTheme = {
  backgroundColor: "#f2f5fa",
  color: "#090c11",
  secondary: "#85898d",
  borderColor: "#333",
};

export const darkTheme = {
  backgroundColor: "#090c11",
  color: "#f2f5fa",
  secondary: "#85898d",
  borderColor: "#fff",
};

axios.defaults.baseURL = "https://sekani-admin-server.vercel.app/Sekani";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(!true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filteredData, setFilteredData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <UserContext.Provider
      value={{
        darkMode,
        setDarkMode,
        isMobile,
        filteredData,
        setFilteredData,
        filterCriteria,
        setFilterCriteria,
      }}
    >
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-review" element={<Reviews />} />
            <Route path="/reviews" element={<AllReviews />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </UserContext.Provider>
  );
}

export default App;
