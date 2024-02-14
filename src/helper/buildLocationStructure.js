const { countryCodes } = require("../constants/countryCodes");

function extractWhoisLocation(data) {
  if (
    !data ||
    !data.endpoints ||
    data.endpoints.length === 0 ||
    !data.endpoints[0].whois ||
    data.endpoints[0].whois.length === 0
  ) {
    return [];
  }

  const extractedLocations = [];
  const mappings = {
    City: "city",
    PostalCode: "postalCode",
    Country: "countryCode",
    Address: "address",
  };

  data.endpoints.forEach((endpoint) => {
    const whoisInfo = endpoint.whois;
    const extractedInfo = {};

    whoisInfo.forEach((info) => {
      const attribute = info.attribute;
      const value = info.value;
      if (mappings[attribute]) {
        extractedInfo[mappings[attribute]] = value;
      }
    });

    extractedLocations.push(extractedInfo);
  });

  const locations = extractedLocations.map((loc) => {
    return {
      ...loc,
      country: countryCodeToCountryName(loc.countryCode),
    };
  });

  return locations;
}

const countryCodeToCountryName = (countryCode) => {
  return countryCodes[countryCode] || "Country Not Found";
};

module.exports = { extractWhoisLocation };
