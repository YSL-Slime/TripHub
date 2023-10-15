import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    guest: {
      type: String,
      required: true,
    },
    options: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("book", bookSchema);
