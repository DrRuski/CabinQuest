import { API_BASE_URL } from "../url/url";

export const authFetchHeader = async (data, endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data, null, 2),
  });
  return response;
};
