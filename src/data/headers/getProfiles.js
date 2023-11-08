import { API_BASE_URL, PROFILES } from "../url/url";

export const getProfilesHeader = async (token, name, controller) => {
  if (name) {
    return await fetch(`${API_BASE_URL}${PROFILES}${name}/venues`, {
      signal: controller.signal,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return await fetch(`${API_BASE_URL}${PROFILES}`, {
      signal: controller.signal,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};
