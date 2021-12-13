const bcryptjs = require("bcryptjs");
const { ErrorHandler } = require("./errorHelper");

exports.comparePassword = (password1, password2) => {
  const isMatch = bcryptjs.compareSync(password1, password2);
  if (!isMatch)
    throw new ErrorHandler(400, "The email or password is incorrect");
};
