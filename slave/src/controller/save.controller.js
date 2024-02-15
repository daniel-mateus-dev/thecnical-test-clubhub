const {
  buildAttachDataSslWithWois,
} = require("../helper/attachDataSslWithWhois");
const { getSslInfo } = require("../services/sslLabs.service");
const { getInfoWhois } = require("../services/whois.service");
const { extractWhoisLocation } = require("../helper/buildLocationStructure");
const { saveLocationController } = require("./location.controller");

const { Endpoint } = require("../database/models/endpoints");

const saveDataHotelController = async (url, hotelId, retries = 3) => {
  let r = 1;

  try {
    console.log(`Getting hotel data for ${url}`);

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
    console.log("Error save data");
    console.error(error);
    console.log(`retries strategy: if ${r} <= 3`);
    if (r <= 3) {
      r++;
      saveDataHotelController(url, hotelId, r);
    } else {
      console.log(`retries strategy finished failed`);
    }
  }
};

module.exports = { saveDataHotelController };
