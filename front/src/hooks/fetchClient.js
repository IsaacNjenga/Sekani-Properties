import axios from "axios";
import { useState } from "react";
import { useNotification } from "../contexts/NotificationContext";

function useFetchClient() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();

  const fetchClient = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`fetch-client-details?id=${id}`);
      if (res.data.success) {
        setClient(res.data.clientDetails);
        console.log(
          "🚀 ~ fetchClient ~ res.data.clientDetails:",
          res.data.clientDetails
        );
      }
    } catch (error) {
      console.error("Error fetching client details:", error);
      openNotification("error", "Failed to fetch client details.", "Error");
    }
    setLoading(false);
  };

  return { client, clientLoading: loading, fetchClient };
}

export default useFetchClient;
