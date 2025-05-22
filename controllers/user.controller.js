const { signupService, findUserByEmail } = require("../services/user.service");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const user = await signupService(req.body);

    //   empletment your email

    res.status(200).json({
      status: "success",
      message: "Successfully signed up",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const user = await signupService(req.body);

    //   empletment your email

    res.status(200).json({
      status: "success",
      message: "Successfully user add",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

/** conditions of login
 *
 * 1. Check if Email and passwrod are given
 * 2. Load use with email
 * 3. if not found user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. Check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send use and token
 */

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials.",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account.",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Invalid credentials",
      });
    }
    if (user.status !== "active") {
      return res.status(401).json({
        status: "fail",
      });
    }

    const token = generateToken(user);

    const { password: pdw, ...rest } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Successfully looged in",
      data: {
        user: rest,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmail(req?.user?.email);
    const { password: pdw, ...rest } = user.toObject();

    res.status(200).json({
      status: "success",
      data: rest,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};
