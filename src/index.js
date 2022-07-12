import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Book from "../models/Books";
import cors from "cors";

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
