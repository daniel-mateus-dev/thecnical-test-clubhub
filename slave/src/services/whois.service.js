const whois = require("whois");
const { parseWhoIsData } = require("parse-whois");

const getInfoWhois = async (hostname) => {
  try {
    return await new Promise((resolve, reject) => {
      whois.lookup(hostname, {}, (err, info) => {
        if (err) reject(err);
        resolve(parseWhoIsData(info));
      });
    });
  } catch (error) {
    console.error(`Erro get info for ${hostname}, error: ${error}`);
    throw error;
  }
};

module.exports = { getInfoWhois };
