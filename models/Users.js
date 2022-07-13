import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
