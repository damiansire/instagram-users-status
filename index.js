const axios = require("axios");
const { parse } = require("node-html-parser");

function getTitleFromHtml(htmlString, usernmae) {
  const root = parse(htmlString);
  const titleTag = root.querySelector("title");
  const titleText = titleTag
    ? titleTag.textContent.split(`(@${usernmae})`)[0].trim()
    : "No se encontró la etiqueta <title>";

  return titleText;
}

async function getUserStatus(username) {
  try {
    console.log("Verifying user:", username);
    const response = await axios.get(`https://www.instagram.com/${username}/`);
    if (response.data.includes(`name="description"`)) {
      return { username, showName: getTitleFromHtml(response.data, username) };
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
