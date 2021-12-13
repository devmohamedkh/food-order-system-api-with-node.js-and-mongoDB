const { ErrorHandler } = require("./errorHelper");

exports.havePermission = (req, userId) => {
  if (userId != req.user._id && !req.admin)
    throw new ErrorHandler(402, "you dont have promithon to make change! ");
};
