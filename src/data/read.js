import { useEffect, useState } from "react";
import { getVenues } from "./headers/getVenues";
import { useLocation, useParams } from "react-router-dom";

export default function useData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    async function getData() {
      try {
        setIsLoading(true);
        const response = await getVenues(params.id, controller);
        if (response.ok) {
          setData(await response.json());
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();

    return function () {
      controller.abort();
    };
  }, [params.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return { data, isLoading };
}
