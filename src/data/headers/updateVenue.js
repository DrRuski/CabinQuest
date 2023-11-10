export const updateVenue = (data, token) => {
  if (token) {
    // Header to log in users who already have a registered account and for managers to create a new venue. (Used in login.jsx and createVenue.jsx)
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
