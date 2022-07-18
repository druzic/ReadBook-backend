import mongoose from "mongoose";
const issuedSchema = new mongoose.Schema({
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
  issuedDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
});

const Issued = mongoose.model("issued", issuedSchema);
export default Issued;
