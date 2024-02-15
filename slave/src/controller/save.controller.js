const {
  buildAttachDataSslWithWois,
} = require("../helper/attachDataSslWithWhois");
const { getSslInfo } = require("../services/sslLabs.service");
const { getInfoWhois } = require("../services/whois.service");
const { extractWhoisLocation } = require("../helper/buildLocationStructure");
const { saveLocationController } = require("./location.controller");

const { Endpoint } = require("../database/models/endpoints");

const saveDataHotelController = async (url, hotelId) => {
  try {
    console.log(`Getting hotel data for ${url}`);
    console.log(
      "****************************************************************"
    );
    console.log(hotelId);
    console.log(
      "****************************************************************"
    );
    const sslInfo = await getSslInfo(url);

    if (!sslInfo?.endpoints?.length) {
      throw new Error("Endpoints not found");
    }

    let ips = [];
    ips = sslInfo.endpoints.map((ep) => ep.ipAddress);

    if (ips.length === 0) {
      throw new Error("Ips not found");
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

    let locationPromises = [];

    dataStructured.endpoints.forEach((endpoint) => {
      console.log(endpoint.location);
      locationPromises.push(
        saveLocationController(
          endpoint.location.countryCode,
          endpoint.location.city,
          endpoint.location.postalCode,
          endpoint.location.address
        )
      );
    });

    const lts = await Promise.all(locationPromises);

    let savePromises = [];

    dataStructured.endpoints.forEach((endpoint, idx) => {
      savePromises.push(
        Endpoint.create({
          hotelId,
          data: endpoint,
          locationId: lts[idx],
        })
      );
    });

    await Promise.all(savePromises);
    console.log("Hotels data saved");
  } catch (error) {
    console.error(error);
    console.log("Error save data");
  }
};

module.exports = { saveDataHotelController };
