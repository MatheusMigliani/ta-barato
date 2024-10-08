import axios from "axios";

const apiKey = "";
const http = axios.create({
  baseURL: "https://api.isthereanydeal.com/",
});

export const getDeals = async () => {
  try {
    const response = await http.get("deals/v2", {
      params: {
        key: apiKey,
        country: "BR",
        shops: "61,35,50",
        mature: true,
        limit: 30,
      },
    });
    return response.data.list;
  } catch (error) {
    console.error("Error fetching deals:", error);
  }
};  

export const getGameInfo = async (gameId) => {
  try {
    const response = await http.get("games/info/v2", {
      params: {
        key: apiKey,
        id: gameId,
      },
    });
    return response.data.assets.banner600;
  } catch (error) {
    console.error("Error fetching game info:", error);
  }
};

export const getGameBoxart = async (gameId) => {
  try {
    const response = await http.get("games/info/v2", {
      params: {
        key: apiKey,
        id: gameId,
      },
    });
    console.log("boxarts :", response.data);
    return response.data.assets.boxart;
  } catch (error) {
    console.error("Error fetching game info:", error);
  }
};



export const getMostPopularGames = async () => {
  try {
    const response = await http.get("stats/most-popular/v1", {
      params: {
        key: apiKey,
        country: "BR",
        limit: 30,
      },
    });
    console.log("popular:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching most popular games:", error);
  }
};

export const getMostCollectedGames = async () => {
  try {
    const response = await http.get("stats/most-collected/v1", {
      params: {
        key: apiKey,
        country: "BR",
        limit: 30,
      },
    });
    console.log("collected:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching most collected games:", error);
  }
};

export const getMostWaitlistedGames = async () => {
  try {
    const response = await http.get("stats/most-waitlisted/v1", {
      params: {
        key: apiKey,
        limit: 30,
      },
    });
    console.log("waitlisted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching most waitlisted games:", error);
  }
};
