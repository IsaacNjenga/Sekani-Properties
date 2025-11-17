import { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export const useDrawer = () => useContext(DrawerContext);

export function DrawerProvider({ children }) {
  const [openReview, setOpenReview] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);

  const toggleReview = () => setOpenReview(!openReview);
  const toggleSchedule = () => setOpenSchedule(!openSchedule);

  const value = { openReview, toggleReview, toggleSchedule, openSchedule };
  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}
