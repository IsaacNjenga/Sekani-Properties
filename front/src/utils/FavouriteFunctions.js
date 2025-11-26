import axios from "axios";
import { useFavourites } from "../contexts/FavouritesContext";

export function FavouriteFunctions() {
  const { favouriteItems, setFavouriteItems } = useFavourites();

  const addToFavourites = (item) => {
    const url = `${process.env.REACT_APP_API_URL}/analytics/like/${item._id}`;
    setFavouriteItems((prevItems) => [...prevItems, { ...item }]);
    axios.post(url).catch(() => {});
  };

  const removeFromFavourites = (id) => {
    const url = `${process.env.REACT_APP_API_URL}/analytics/unlike/${id}`;
    setFavouriteItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
    axios.post(url).catch(() => {});
  };

  const isInFavourites = (item) =>
    favouriteItems.some((favouriteItem) => favouriteItem._id === item?._id);

  return { addToFavourites, removeFromFavourites, isInFavourites };
}
