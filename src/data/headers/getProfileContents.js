export const getProfileContents = async (url, token, controller) => {
  if (token) {
    return await fetch(url, {
      signal: controller.signal,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return;
  }
};
