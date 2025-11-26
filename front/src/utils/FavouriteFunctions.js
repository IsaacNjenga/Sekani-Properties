import { useFavourites } from "../contexts/FavouritesContext";

export function FavouriteFunctions() {
  const { favouriteItems, setFavouriteItems } = useFavourites();

  const addToFavourites = (item) => {
    setFavouriteItems((prevItems) => [...prevItems, { ...item }]);
  };

  const removeFromFavourites = (id) => {
    setFavouriteItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  };

  const isInFavourites = (item) =>
    favouriteItems.some((favouriteItem) => favouriteItem._id === item?._id);

  return { addToFavourites, removeFromFavourites, isInFavourites };
}
