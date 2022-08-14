const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: "Invalid authorization token!",
    });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const { _id } = jwt.verify(token, process.env.DB_SECRET);

    req.user = await User.findOne({ _id: _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized!" });
  }
};

module.exports = requireAuth;
