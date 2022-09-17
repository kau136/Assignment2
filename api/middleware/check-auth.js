const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token,process.env.JWTSECRET);
    if (verify.userType == "admin") {
            next();
    } 
    else {
            return res.status(401).json({
              msg: "not admin",
            });
    }
  } catch (error) {
    return res.status(401).json({
      msg: "invalid token",
    });
  }
};

