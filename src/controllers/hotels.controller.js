const { getSslInfo } = require("../services/sslLabs.service");
const { getInfoWhois } = require("../services/whois.service");

const hotelsController = {
  getInfo: async (req, res) => {
    try {
      const sslInfo = await getSslInfo(req.query.host);

      let ips = [];
      ips = sslInfo.endpoints.map((ep) => ep.ipAddress);

      if (ips.length == 0) {
        res.status(400).json({
          status: 400,
          message: "Endpoint not found",
        });
        return;
      }

      const whoisInfo = ips.map((ip) => getInfoWhois(ip));
      const info = await Promise.all(whoisInfo);

      res.status(200).json({
        status: 200,
        message: "Successfully get all hotels",
        data: {
          ...sslInfo,
          ...info,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Error getting hotel information",
        error,
      });
    }
  },
};

module.exports = { hotelsController };
