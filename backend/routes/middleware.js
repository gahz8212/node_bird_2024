const passport = require("passport");
const jwt = require("jsonwebtoken");
exports.loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
};
exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SCRECT);
    return next();
  } catch (e) {
    if (e.name === "tokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료 되었습니다.",
      });
    } else {
      return res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰 입니다.",
      });
    }
  }
};
