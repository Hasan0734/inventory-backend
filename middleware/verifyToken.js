const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");

/**
 * 1. check if token exists
 * 2. if not token send res
 * 3. decode the token
 * 4. if valid then next
 */

module.exports = async (req, res, next) => {
  try {
    // 1. check for token

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(404).json({
        status: "fail",
        error: "Your are not logged in.",
      });
    }

    const token = authHeader?.split(" ")?.[1];
    // 2. verify token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    // 3. Get user from DB
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "User no longer exists.",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        status: "fail",
        error: "Your account is not active. Please contact support.",
      });
    }
    //4. Attach uset to request object
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "Invalid or expired token",
    });
  }
};
