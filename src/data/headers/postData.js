export const postData = (data, token) => {
  if (token) {
    // Header for logged in users who want to create a new venue. (Used in Venue Manager page)
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data, null, 2),
    };
  } else {
    // Header for new registering users. (Used in Sign up page)
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data, null, 2),
    };
  }
};
