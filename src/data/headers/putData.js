export const putData = async (url, data, token) => {
  if (token) {
    return await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data, null, 2),
    });
  } else {
    return;
  }
};
