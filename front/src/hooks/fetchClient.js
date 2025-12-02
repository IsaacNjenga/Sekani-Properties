import axios from "axios";
import { useEffect, useState } from "react";
import { useNotification } from "../contexts/NotificationContext";

function useFetchClient() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const openNotification = useNotification();

  const fetchClient = async (email) => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await axios.get(`fetch-client-details?email=${email}`);
      if (res.data.success) {
        setClient(res.data.clientDetails);
      }
    } catch (error) {
      console.error("Error in fetching client details:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again later.";
      openNotification("warning", errorMessage, "Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClient();

    //eslint-disable-next-line
  }, [refreshKey]);

  return {
    client,
    clientLoading: loading,
    fetchClient,
    clientRefresh: () => setRefreshKey((prev) => prev + 1),
  };
}

export default useFetchClient;
