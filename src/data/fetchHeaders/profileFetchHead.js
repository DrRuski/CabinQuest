import { API_BASE_URL, ALL_PROFILES } from "../url/url";

export const fetchHeader = async (token, name, controller) => {
  if (name) {
    const response = await fetch(`${API_BASE_URL}${ALL_PROFILES}${name}`, {
      signal: controller.signal,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    const response = await fetch(`${API_BASE_URL}${ALL_PROFILES}`, {
      signal: controller.signal,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};
