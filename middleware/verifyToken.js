const jwt = require('jsonwebtoken');
const {promisify} = require('util')

/**
 * 1. check if token exists
 * 2. if not token send res
 * 3. decode the token
 * 4. if valid then next
 */

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(404).json({
        status: "fail",
        error: "Your are not logged in.",
      });
    }
    const decode = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);

    req.user = decode;
    next();
  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "Invalid token",
    });
  }
};
