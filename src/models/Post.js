import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    abstract: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: String,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    roomWidth: {
      type: String,
      required: true,
    },
    roomHeight: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    beds: {
      type: String,
      required: true,
    },
    guests: {
      type: String,
      required: true,
    },
    singleBeds: {
      type: String,
      required: true,
    },
    bookOption: {
      type: [String],
      required: true,
    },
    bookOPrice: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
