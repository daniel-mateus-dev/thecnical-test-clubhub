const {
  buildAttachDataSslWithWois,
} = require("../helper/attachDataSslWithWhois");
const { getSslInfo } = require("../services/sslLabs.service");
const { getInfoWhois } = require("../services/whois.service");
const { extractWhoisLocation } = require("../helper/buildLocationStructure");
const { sendMessage } = require("../services/kafka.service");

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

      if (ips.length === 0) {
        res.status(400).json({
          status: 400,
          message: "Endpoints not found",
        });
        return;
      }

      const whoisInfo = ips.map((ip) => getInfoWhois(ip));
      const info = await Promise.all(whoisInfo);

      const dataStructured = buildAttachDataSslWithWois(sslInfo, info);

      const locations = extractWhoisLocation(dataStructured);

      dataStructured.endpoints.forEach((endpoint, idx) => {
        dataStructured.endpoints[idx] = {
          ...endpoint,
          location: locations[idx],
        };
      });

      await sendMessage("start-save-data", { ...dataStructured });

      res.status(200).json({
        status: 200,
        message: "Successfully get info of hotel",
        data: {
          ...dataStructured,
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
