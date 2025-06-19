const jwt = require("jsonwebtoken");

const genToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
  });
};

module.exports = {
  genToken,
};
