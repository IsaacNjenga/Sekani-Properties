import axios from "axios";
import { useEffect, useState } from "react";
import { useNotification } from "../contexts/NotificationContext";

function useFetchProperty() {
  const openNotification = useNotification();
  const [propertyData, setPropertyData] = useState([]);
  const [propertyDataLoading, setPropertyDataLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);

  const fetchProperty = async (id) => {
    if (!id) return;
    setPropertyDataLoading(true);
    try {
      const res = await axios.get(`fetch-property?id=${id}`);
      if (res.data.success) {
        setPropertyData(res.data.property);
        console.log(res.data.property);
      }
    } catch (error) {
      console.error("Error in fetching property:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again later.";
      openNotification("warning", errorMessage, "Error");
    } finally {
      setPropertyDataLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();

    //eslint-disable-next-line
  }, [refreshKey]);

  return {
    propertyData,
    propertyDataLoading,
    fetchProperty,
    propertyRefresh: () => setRefreshKey((prev) => prev + 1),
  };
}

export default useFetchProperty;
