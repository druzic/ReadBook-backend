import mongoose from "mongoose";
const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

const Reservation = mongoose.model("reservation", reservationSchema);
export default Reservation;
