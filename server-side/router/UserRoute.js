const express = require("express");
const route = express.Router();
route.use(express.json());
const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const bcrypt = require("bcrypt");
//auth is a middleware for verifying the token
const auth = require("../middleware/auth");
const _ = require("lodash");

//registering a new user
route.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const isThereUser = await UserModel.findOne({ email: email.toLowerCase() });
  if (isThereUser) res.send(`already have an account with ${email}`);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new UserModel({ username, email, password: hashedPassword });
  await user.save();
  res.header("token", user.generateToken()).send(user);
});
//

//login a user
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) throw { message: "invalid email", username: "" };
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      res.header("token", user.generateToken()).send(user);
    } else throw { message: "invalid password", username: user.username };
  } catch (e) {
    res.send(e);
  }
});

//return users
route.get("/me", auth, async (req, res) => {
  const user = await UserModel.findById({ _id: req.user._id });
  res.header("token", user.generateToken()).send(user);
});

// getting users notes
route.get("/notes", auth, async (req, res) => {
  const response = await UserModel.findOne(
    { _id: req.user._id },
    "note -_id"
  ).populate({ path: "note", options: { sort: { date: -1 } } });
  //const sorted = _.orderBy(response.note,'date','desc')
  res.send(response.note);
});
module.exports = route;
