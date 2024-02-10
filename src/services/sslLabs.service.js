const axios = require("axios").default;
const { sslLabs } = require("../config");

const getSslInfo = async (host) => {
  try {
    const response = await axios.get(sslLabs.hostname, {
      params: {
        host,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erro get ssl info for ${hostname}, error: ${error}`);
  }
};

module.exports = { getSslInfo };
