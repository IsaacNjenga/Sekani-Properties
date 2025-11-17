import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export function UserProvider({ children }) {
  const [darkMode, setDarkMode] = useState(!true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filteredData, setFilteredData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value = {
    darkMode,
    setDarkMode,
    isMobile,
    filteredData,
    setFilteredData,
    filterCriteria,
    setFilterCriteria,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
