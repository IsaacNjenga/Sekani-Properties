import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Properties from "./pages/Properties";
import About from "./pages/About";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";

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

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(!true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <UserContext.Provider value={{ darkMode, setDarkMode, isMobile }}>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </UserContext.Provider>
  );
}

export default App;
