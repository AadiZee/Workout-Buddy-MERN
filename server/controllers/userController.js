const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.DB_SECRET, { expiresIn: "3d" });
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (user) {
      const token = createToken(user._id);

      return res
        .status(200)
        .json({ email, token, message: "Login successful!" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//register
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.register(email, password);
    if (user) {
      const token = createToken(user._id);

      return res
        .status(200)
        .json({ email, token, message: "Registration successful!" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
