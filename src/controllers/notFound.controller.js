const notFoundController = (_, res) => {
  res.status(404).json({
    status: 404,
    message: "ROUTE_NOT_FOUND",
  });
};

module.exports = { notFoundController };
