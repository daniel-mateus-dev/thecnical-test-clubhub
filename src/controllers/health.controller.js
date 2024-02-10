const healthController = (_, res) => {
  res.status(200).json({
    status: 200,
    uptime: new Date().getTime(),
  });
};

module.exports = { healthController };
