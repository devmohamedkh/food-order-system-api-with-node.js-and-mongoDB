const { verifAdminJWT } = require("./jwt");

exports.isAdmin = (req, res, next) => {
  const token = req.header("admin-token");
  if (!token) return next();
  try {
    const verifiedAdmin = verifAdminJWT(token);
    req.admin = verifiedAdmin;
    next();
  } catch (err) {
    console.log(err);
    return next();
  }
};
