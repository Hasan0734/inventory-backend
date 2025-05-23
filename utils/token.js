const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
  const paylod = {
    email: userInfo.email,
    role: userInfo.role,
    id: userInfo._id,
  };
  const token = jwt.sign(paylod, process.env.TOKEN_SECRET, {
    expiresIn: "7days",
  });

  return token;
};
