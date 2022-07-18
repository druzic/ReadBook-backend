const express = require("express");
import User from "../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";
const authRoutes = express.Router();

const handleErrors = (error) => {
  console.log(error.message, error.code);
};

authRoutes.post("/user/login", async (req, res) => {
  //console.log(req.body);
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please check your email and password." });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res
        .status(400)
        .json({ error: "Please check your email and password." });
    }

    const id = { user: { id: user.id } };
    jwt.sign(
      { id },
      process.env.SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    handleErrors(error);
    res.status(400).send(error, "user not created");
  }
});

authRoutes.get("/user/login", [auth], async (req, res) => {
  // console.log(req.user);
  try {
    let users = await User.findOne({ _id: req.user }).select("-password");
    res.json(users);
    //console.log(users);
  } catch (error) {
    console.log(error);
  }
});

authRoutes.post("/user/add", async (req, res) => {
  //console.log(req.body);
  const { name, email, password } = req.body;

  try {
    let newUser = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();

    return res.status(200).json({ msg: "User added", newUser });
  } catch (error) {
    handleErrors(error);
    res.status(400).json({ msg: "Invalid data", data: req.body });
  }
});

authRoutes.get("/user", async (req, res) => {
  try {
    let users = await User.find({ isAdmin: false }).select("-password");
    res.send(users);
    //console.log(users);
  } catch (error) {
    console.log(error);
  }
});

authRoutes.delete("/user/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
  }
});

authRoutes.patch("/user/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { doc } = req.body;
    //console.log(doc);
    let user = await User.findOne({ _id: id });
    user.name = doc.name;
    user.email = doc.email;
    await user.save();
    //console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = authRoutes;
