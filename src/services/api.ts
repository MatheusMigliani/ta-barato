import axios from "axios";

const apiKey = "ecc3f1d88691c5c5fc3010084cf9973dd7945d79";
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
    return response.data.assets.boxart;
  } catch (error) {
    console.error("Error fetching game info:", error);
  }
};

export const getGamePrices = async (gameId) => {
  try {
    const response = await http.get("games/prices/v2", {
      params: {
        key: apiKey,
        ids: gameId,
      },
    });
    const prices = response.data.data[gameId].list[0];
    console.log("Prices for gameId:", gameId, prices);
    return {
      amount: prices.price_new,
      cut: prices.price_cut,
      regular: prices.price_old,
      historyLow: prices.price_cut, // Ajuste conforme necessário se você tiver uma fonte separada para o menor preço histórico
    };
  } catch (error) {
    console.error("Error fetching game prices:", error);
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
