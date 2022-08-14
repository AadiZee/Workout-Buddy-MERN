const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.register = async function (email, password) {
  if (!email && !password) {
    throw Error("All fields are required!");
  }
  if (!email) {
    throw Error("Email is required!");
  }
  if (!password) {
    throw Error("Password is required!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password not strong! Length of password should be minimum 8 characters, should contain minimum 1 lowercase character, minimum 1 uppercase character and minimum 1 symbol!"
    );
  }

  const existingUser = await this.findOne({ email: email });
  if (existingUser) {
    throw Error("Email already in use!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email: email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email && !password) {
    throw Error("All fields are required!");
  }
  if (!email) {
    throw Error("Email is required!");
  }
  if (!password) {
    throw Error("Password is required!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }

  const existingUser = await this.findOne({ email: email });
  if (!existingUser) {
    throw Error("User not found for the email provided!");
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    throw Error("Password is not valid!");
  }

  return existingUser;
};

module.exports = mongoose.model("User", userSchema);
