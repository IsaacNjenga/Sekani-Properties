import { createContext, useContext, useState } from "react";

const ReviewContext = createContext();

export const useReview = () => useContext(ReviewContext);

export function ReviewProvider({ children }) {
  const [openReview, setOpenReview] = useState(false);

  const toggleReview = () => setOpenReview(!openReview);

  const value = { openReview, toggleReview };
  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}
