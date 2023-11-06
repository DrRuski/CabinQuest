import { API_BASE_URL, ALL_PROFILES } from "../url/url";

export const getProfilesHeader = async (token, name, controller) => {
  if (name) {
    return await fetch(`${API_BASE_URL}${ALL_PROFILES}${name}`, {
      signal: controller.signal,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return await fetch(`${API_BASE_URL}${ALL_PROFILES}`, {
      signal: controller.signal,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};
