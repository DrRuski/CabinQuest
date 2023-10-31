export const imageValidation = async (venues, token, controller) => {
  const promises = venues.map((venue) =>
    fetch(venue.media, {
      signal: controller.signal,
      method: "HEAD",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.status === 200)
      .catch(() => false)
  );
  const results = await Promise.all(promises);
  return venues.filter((_, index) => results[index]);
};
