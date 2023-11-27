import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useDynamicFetch(
  url,
  dynamicHeader,
  token,
  dataContent
) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await dynamicHeader(
          url,
          controller,
          token,
          dataContent
        );
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        setError(error);
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return function () {
      controller.abort();
    };
  }, [url, dynamicHeader, token, dataContent]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return { data, setData, error, isLoading };
}
