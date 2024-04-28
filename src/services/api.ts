import axios from "axios";

const apiKey = "ecc3f1d88691c5c5fc3010084cf9973dd7945d79";
const http = axios.create({
  baseURL: "https://api.isthereanydeal.com/",
});

// Função para obter dados, com a chave de API como parâmetro
export const getDeals = async () => {
  try {
    const response = await http.get("deals/v2", { params: { key: apiKey,country: "BR", } });
    console.log("API Data:", response.data);
    // Acessar a lista de deals diretamente da propriedade 'list' do objeto
    return response.data.list; // Assumindo que a estrutura da resposta está correta
  } catch (error) {
    console.error("Error fetching deals:", error);
  }
};
