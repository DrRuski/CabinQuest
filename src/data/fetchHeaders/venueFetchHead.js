import { API_BASE_URL, VENUES_ENDPOINT, QUERY_PARAMS } from "../url/url";

export const fetchHeader = async (token, id, controller) => {
  if (id) {
    const response = await fetch(
      `${API_BASE_URL}${VENUES_ENDPOINT}${id}${QUERY_PARAMS}`,
      {
        signal: controller.signal,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } else {
    const response = await fetch(
      `${API_BASE_URL}${VENUES_ENDPOINT}${QUERY_PARAMS}`,
      {
        signal: controller.signal,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }
};
