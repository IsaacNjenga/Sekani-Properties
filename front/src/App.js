import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Properties from "./pages/Properties";
import About from "./pages/About";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import axios from "axios";
import AllReviews from "./pages/AllReviews";
import PropertyDetails from "./pages/PropertyDetails";

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

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<AllReviews />} />
            <Route path="/property/" element={<PropertyDetails />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
