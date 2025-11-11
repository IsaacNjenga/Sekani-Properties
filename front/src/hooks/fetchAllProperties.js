import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { message } from "antd";

function useFetchAllProperties() {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchProperties = useCallback(async (pageNum = 1, refresh = false) => {
    // Don't show loading for pagination, only for initial load or refresh
    if (pageNum === 1 || refresh) {
      setPropertiesLoading(true);
    }
    
    try {
      if (refresh) setRefreshing(true);

      const res = await axios.get(
        `/fetch-all-properties?page=${pageNum}&limit=12` // Increased to 12 for better grid layout
      );

      if (res.data.success) {
        const newProperties = res.data.properties;
        
        if (refresh || pageNum === 1) {
          setProperties(newProperties);
        } else {
          // Simple append for pagination - dedupe by _id
          setProperties(prev => {
            const existingIds = new Set(prev.map(p => p._id));
            const uniqueNew = newProperties.filter(p => !existingIds.has(p._id));
            return [...prev, ...uniqueNew];
          });
        }
        
        setHasMore(pageNum < res.data.totalPages);
        setPage(pageNum);
        setErrorMessage(null);
      } else {
        const errorMsg = res.data.message || "Failed to fetch properties.";
        setErrorMessage(errorMsg);
        message.error(errorMsg);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      const errorMsg = error.response?.data?.message || "Failed to load properties. Please try again.";
      setErrorMessage(errorMsg);
      message.error(errorMsg);
    } finally {
      setRefreshing(false);
      setPropertiesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties(1);
  }, [fetchProperties]);

  const handleLoadMore = useCallback(async () => {
    if (hasMore && !propertiesLoading && !refreshing) {
      await fetchProperties(page + 1);
    }
  }, [hasMore, propertiesLoading, refreshing, page, fetchProperties]);

  const propertiesRefresh = useCallback(() => {
    fetchProperties(1, true);
  }, [fetchProperties]);

  return {
    properties,
    propertiesLoading,
    errorMessage,
    propertiesRefresh,
    handleLoadMore,
    hasMore,
  };
}

export default useFetchAllProperties;