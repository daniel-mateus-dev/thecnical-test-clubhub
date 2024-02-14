const buildAttachDataSslWithWois = (sslInfo, whoisInfo) => {
  let endpointsInfo = [];

  sslInfo.endpoints.map((endpoint, idx) => {
    endpointsInfo.push({
      ...endpoint,
      whois: whoisInfo[idx],
    });
  });

  return {
    ...sslInfo,
    endpoints: endpointsInfo,
  };
};

module.exports = { buildAttachDataSslWithWois };
