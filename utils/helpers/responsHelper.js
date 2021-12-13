exports.successResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    status: "success",
    statusCode,
    data,
  });
};

exports.loginSuccessResponse = (data, token) => {
  const statusCode = 200;
  return {
    status: "success",
    statusCode,
    data,
    token,
  };
};
