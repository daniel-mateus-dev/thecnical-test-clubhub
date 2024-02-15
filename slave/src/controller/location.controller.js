const { City } = require("../database/models/city");
const { Country } = require("../database/models/country");
const { Location } = require("../database/models/location");
const {
  countryCodeToCountryName,
} = require("../helper/buildLocationStructure");

const saveLocationController = async (code, city, zip_code, address) => {
  try {
    const countryName = countryCodeToCountryName(code);

    if (countryName === "Country Not Found") {
      throw new Error("Country code not found");
    }

    const countryWanted = await Country.findOrCreate({
      where: {
        code: code.toUpperCase(),
        country: countryCodeToCountryName(code),
      },
      defaults: {
        code: code.toUpperCase(),
        country: countryCodeToCountryName(code),
      },
    });

    const country = countryWanted[0].dataValues;

    const cityWanted = await City.findOrCreate({
      where: {
        city,
        countryId: country.id,
      },
      defaults: {
        city,
        countryId: country.id,
      },
    });

    const citySearched = cityWanted[0].dataValues;

    const location = await Location.create({
      address,
      zip_code,
      cityId: citySearched.id,
      countryId: country.id,
    });

    return location.dataValues.id;
  } catch (error) {
    console.error(error);
    throw new Error("Error location save");
  }
};

module.exports = { saveLocationController };
