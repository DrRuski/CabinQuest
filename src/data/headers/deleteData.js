export const deleteData = async (url, token) => {
  if (token) {
    return await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return;
  }
};
