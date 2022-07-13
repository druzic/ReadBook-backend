import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Book from "../models/Books";
import User from "../models/Users";
import cors from "cors";
import bcrypt from "bcryptjs";

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected"))
  .catch((error) => console.log(error));

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
const port = 3000;

app.post("/user/add", async (req, res) => {
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
    //console.log(newBook);

    return res.status(200).json({ msg: "User added", newUser });
  } catch (error) {
    res.status(400).json({ msg: "Invalid data", data: req.body });
  }
});

app.get("/user", async (req, res) => {
  try {
    let users = await User.find({}).select("-password");
    res.send(users);
    console.log(users);
  } catch (error) {
    console.log(error);
  }
});

app.post("/book/add", async (req, res) => {
  //console.log(req.body);
  const { title, author, isbn, quantity, description, category } = req.body;

  try {
    let newBook = new Book({
      title,
      author,
      isbn,
      quantity,
      description,
      category,
    });
    await newBook.save();
    //console.log(newBook);

    return res.status(200).json({ msg: "Book added", newBook });
  } catch (error) {
    res.status(400).json({ msg: "Invalid data", data: req.body });
  }
});

app.get("/book", async (req, res) => {
  try {
    let books = await Book.find({});
    res.send(books);
    //console.log(books);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/user/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.patch("/user/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { doc } = req.body;
    console.log(doc);
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

app.delete("/book/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Book.deleteOne({ _id: id });
    res.status(200).json({ msg: "Book deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.patch("/book/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { doc } = req.body;
    console.log(doc);
    let book = await Book.findOne({ _id: id });
    book.title = doc.title;
    book.author = doc.author;
    book.isbn = doc.isbn;
    book.quantity = doc.quantity;
    book.category = doc.category;
    await book.save();
    console.log(book);
    res.send(book);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Slušam na portu ${port}`));
