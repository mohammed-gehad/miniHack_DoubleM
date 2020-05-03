const mongoose = require("mongoose");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "email is not valid"],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
    },
  ],
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.secret || config.get("secret")
  );
  return token;
};
mongoose.model("User", userSchema);
