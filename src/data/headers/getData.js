export const getData = async (url, controller, token) => {
  if (token) {
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (error) {
      console.error("Fetch error", error);
      throw error;
    }
  } else {
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        method: "GET",
      });
      return res;
    } catch (error) {
      console.error("Fetch error", error);
      throw error;
    }
  }
};
