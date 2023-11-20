export const putData = (data, token) => {
  if (token) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data, null, 2),
    };
  } else {
    return;
  }
};
