import { createContext, useContext, useEffect, useState } from "react";
import useFetchAllProperties from "../../hooks/fetchAllProperties";

export const FavouritesContext = createContext();

export function useFavourites() {
  return useContext(FavouritesContext);
}

export function FavouriteProvider({ children }) {
  const { properties } = useFetchAllProperties();
  const [favouriteItems, setFavouriteItems] = useState(() => {
    const storedFavourites = localStorage.getItem("favouriteList");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favouriteList", JSON.stringify(favouriteItems));
  }, [favouriteItems]);

  // compute merged items
  const liveFavouriteItems = favouriteItems
    .map((item) => {
      const property = properties.find((p) => p._id === item._id);
      return property ? { ...property } : null;
    })
    .filter(Boolean); //remove non existent items

  const value = { favouriteItems, setFavouriteItems, liveFavouriteItems };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}
