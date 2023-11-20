import { API_BASE_URL, PROFILES } from "../url/url";

export const getBookingsHeader = async (name, token, controller) => {
  if (name) {
    return await fetch(
      `${API_BASE_URL}${PROFILES}${name}/bookings?_venue=true&_customer=true`,
      {
        signal: controller.signal,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    return;
  }
};
