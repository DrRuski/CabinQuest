import { API_BASE_URL, VENUES_ENDPOINT } from "../url/url";

export const createVenueHeader = async (data, token) => {
  const response = await fetch(`${API_BASE_URL}${VENUES_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data, null, 2),
  });
  return response;
};
