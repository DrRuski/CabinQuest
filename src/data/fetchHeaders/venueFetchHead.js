import { API_BASE_URL } from "../url/apiBaseURL";

export const fetchHeader = async (token, endpoint, id, controller) => {
  if (id) {
    const response = await fetch(`${API_BASE_URL}${endpoint}${id}`, {
      signal: controller.signal,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      signal: controller.signal,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};
