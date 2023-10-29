import { useEffect, useState } from "react";
import { fetchHeader } from "./fetchHeaders/venueFetchHead";
import { useLocation, useParams } from "react-router-dom";

export default function useData(userData) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetchHeader(
          userData.accessToken,
          params.id,
          controller
        );
        if (response.ok) {
          const fetchedData = await response.json();
          setData(fetchedData);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return function () {
      controller.abort();
    };
  }, [userData.accessToken, params.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return { data, isLoading };
}
