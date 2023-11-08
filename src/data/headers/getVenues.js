import {
  API_BASE_URL,
  VENUES_ENDPOINT,
  QUERY_PARAMS,
  VENUE_LIMITER,
} from "../url/url";

export const getVenues = async (id, controller) => {
  if (id) {
    // If ID exists, uses this header to fetch single item from the list. (Used on Venue Details page)
    return await fetch(
      `${API_BASE_URL}${VENUES_ENDPOINT}/${id}?${QUERY_PARAMS}`,
      {
        signal: controller.signal,
        method: "GET",
      }
    );
  } else {
    // If ID don't exist, fetches all listings with a limiter. (Used on Home page)
    return await fetch(
      `${API_BASE_URL}${VENUES_ENDPOINT}?${VENUE_LIMITER}&${QUERY_PARAMS}`,
      {
        signal: controller.signal,
        method: "GET",
      }
    );
  }
};
