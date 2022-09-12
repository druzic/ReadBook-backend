import express from "express";
import Issued from "../models/Issued.js";
import Book from "../models/Books.js";
import Reservation from "../models/Reservations.js";

const issuedRoutes = express.Router();

issuedRoutes.post("/issued/add", async (req, res) => {
  //console.log(req.body);
  const { user, book, issuedDate, dueDate } = req.body;

  try {
    let newIssued = new Issued({
      user,
      book,
      issuedDate,
      dueDate,
    });
    await Book.updateOne(
      { _id: book },
      {
        $inc: { quantity: -1 },
      }
    );
    await newIssued.save();
    //console.log(newIssued);

    return res.status(200).json({ msg: "Done", newIssued });
  } catch (error) {
    res.status(400).json({ msg: "Invalid data", data: req.body });
  }
});

issuedRoutes.post("/issued/reservation", async (req, res) => {
  //console.log(req.body);
  const { user, book, issuedDate, dueDate, reservationID } = req.body;

  try {
    let newIssued = new Issued({
      user,
      book,
      issuedDate,
      dueDate,
    });

    await Reservation.deleteOne({ _id: reservationID });

    await newIssued.save();
    //console.log(newIssued);

    return res.status(200).json({ msg: "Done", newIssued });
  } catch (error) {
    res.status(400).json({ msg: "Invalid data", data: req.body });
  }
});

issuedRoutes.get("/issued", async (req, res) => {
  try {
    let issued = await Issued.find({ isReturned: false }).populate([
      "user",
      "book",
    ]);
    res.send(issued);
    //console.log(issued);
  } catch (error) {
    console.log(error);
  }
});

issuedRoutes.patch("/issued", async (req, res) => {
  const { id, book } = req.body;
  console.log(id);
  try {
    let issued = await Issued.findOne({ _id: id });
    if (issued) {
      issued.isReturned = true;
      await issued.save();
      res.send(issued);
    } else {
      return res.status(400).json({ msg: "Nema knjige" });
    }
    await Book.updateOne(
      { _id: book },
      {
        $inc: { quantity: 1 },
      }
    );
    //console.log(issued);
  } catch (error) {
    console.log(error);
  }
});

issuedRoutes.get("/issued/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let issued = await Issued.find({ user: id, isReturned: false }).populate([
      "user",
      "book",
    ]);
    res.send(issued);
    console.log(issued);
    //console.log(issued);
  } catch (error) {
    console.log(error);
  }
});

export default issuedRoutes;
