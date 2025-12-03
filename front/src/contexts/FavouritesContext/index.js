import { createContext, useContext, useEffect, useState } from "react";
import useFetchAllProperties from "../../hooks/fetchAllProperties";
import useFetchClient from "../../hooks/fetchClient";
import { useAuth } from "../AuthContext";

export const FavouritesContext = createContext();

export function useFavourites() {
  return useContext(FavouritesContext);
}

export function FavouriteProvider({ children }) {
  const { properties } = useFetchAllProperties();
  const { client, fetchClient } = useFetchClient();
  const [favouriteItems, setFavouriteItems] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.email) {
      fetchClient(currentUser?.email);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (client) {
      setFavouriteItems(client.favourites || []);
    }
  }, [client]);

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
