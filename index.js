const axios = require("axios");

async function getInstagramUsersStatus(usernames) {
  const activeUsernames = [];
  const inactiveUsernames = [];
  const activeUsernamesStatus = [];
  for (const username of usernames) {
    try {
      const response = await axios.get(
        `https://www.instagram.com/${username}/`
      );

      if (response.data.includes(`name="description"`)) {
        activeUsernames.push(username);
      } else {
        inactiveUsernames.push(username);
      }
    } catch (error) {
      console.error("Error al verificar", username, error);
    }
  }

  return { activeUsernames, inactiveUsernames, activeUsernamesStatus };
}
