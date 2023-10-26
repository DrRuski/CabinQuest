import { useEffect, useState } from "react";
import { fetchHeader } from "./fetchHeaders/venueFetchHead";
import { UserContext } from "../App";
import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function useData() {
  const params = useParams();
  const location = useLocation();
  const [venueData, setVenueData] = useState([]);
  const { userData } = useContext(UserContext);
  const venuesEndpoint = "/holidaze/venues/";

  useEffect(() => {
    const controller = new AbortController();

    async function fetchVenues() {
      try {
        const response = await fetchHeader(
          userData.accessToken,
          venuesEndpoint,
          params.id,
          controller
        );
        if (response.ok) {
          const data = await response.json();
          setVenueData(data);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
    fetchVenues();
    return function () {
      controller.abort();
    };
  }, [userData.accessToken, params.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return { venueData };
}
