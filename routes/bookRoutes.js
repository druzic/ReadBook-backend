const express = require("express");
import Book from "../models/Books";

const bookRoutes = express.Router();

bookRoutes.post("/book/add", async (req, res) => {
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

bookRoutes.get("/book", async (req, res) => {
  try {
    let books = await Book.find({});
    res.send(books);
    //console.log(books);
  } catch (error) {
    console.log(error);
  }
});
bookRoutes.get("/book/available", async (req, res) => {
  try {
    let books = await Book.find({ quantity: { $gt: 0 } });
    res.send(books);
    //console.log(books);
  } catch (error) {
    console.log(error);
  }
});

bookRoutes.delete("/book/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Book.deleteOne({ _id: id });
    res.status(200).json({ msg: "Book deleted" });
  } catch (error) {
    console.log(error);
  }
});

bookRoutes.patch("/book/update/:id", async (req, res) => {
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

module.exports = bookRoutes;
