import { API_BASE_URL, DELETE_BOOKING } from "../url/url";

export const deleteBooking = async (id, token) => {
  if (id) {
    return await fetch(`${API_BASE_URL}${DELETE_BOOKING}${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return;
  }
};
