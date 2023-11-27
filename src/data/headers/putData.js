export const putData = async (url, token, data) => {
  if (token) {
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data, null, 2),
      });
      return res;
    } catch (error) {
      console.error("Fetch error", error);
      throw error;
    }
  } else {
    return;
  }
};
