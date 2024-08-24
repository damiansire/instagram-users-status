const axios = require("axios");

async function getUserStatus(username) {
  try {
    console.log("Verifying user:", username);
    const response = await axios.get(`https://www.instagram.com/${username}/`);

    if (response.data.includes(`name="description"`)) {
      return { username, followers: 0, following: 0 };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al verificar", username, error);
  }
}

async function getInstagramUsersStatus(usernames) {
  const activeUsernames = [];
  const inactiveUsernames = [];
  const activeUsernamesStatus = [];
  for (const username of usernames) {
    try {
      const userStatus = await getUserStatus(username);

      if (userStatus) {
        activeUsernames.push(userStatus.username);
        activeUsernamesStatus.push(userStatus);
      } else {
        inactiveUsernames.push(username);
      }
    } catch (error) {
      console.error("Error al verificar", username, error);
    }
  }

  return { activeUsernames, inactiveUsernames, activeUsernamesStatus };
}
