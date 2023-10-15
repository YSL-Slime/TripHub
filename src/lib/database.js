import mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO ?? "");
mongoose.set("debug", false);
mongoose.Promise = global.Promise;

function userModel() {
  const schema = new Schema(
    {
      email: { type: String, unique: true, required: true },
      name: { type: String, required: false },
      image: { type: String, required: false },
      password: { type: String, required: false },
      country: { type: String, required: false },
      birthday: { type: String, required: false },
      surname: { type: String, required: false },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.models.User || mongoose.model("User", schema);
}

function postModel() {
  const schema = new Schema(
    {
      title: { type: String, unique: true, required: true },
      abstract: { type: String, required: true },
      location: { type: String, required: true },
      description: { type: String, required: true },
      features: { type: [String], required: true },
      amenities: { type: [String], required: true },
      roomWidth: { type: String, required: true },
      roomHeight: { type: String, required: true },
      price: { type: Number, required: true },
      type: { type: String, required: true },
      beds: { type: String, required: true },
      guests: { type: String, required: true },
      singleBeds: { type: String, required: true },
      images: { type: [String], required: true },
      bookOption: { type: [String], required: true },
      bookOPrice: { type: [String], required: true },
      owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.models.Post || mongoose.model("Post", schema);
}

function reviewModel() {
  const schema = new Schema(
    {
      rating: { type: String, required: true },
      short: { type: String, required: true },
      description: { type: String, required: true },
      owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
      accomodation: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.models.Review || mongoose.model("Review", schema);
}

function bookModel() {
  const schema = new Schema(
    {
      checkIn: { type: String, required: true },
      checkOut: { type: String, required: true },
      guest: { type: String, required: true },
      options: { type: [String], required: true },
      owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
      accomodation: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.models.Book || mongoose.model("Book", schema);
}

export const db = {
  User: userModel(),
  Post: postModel(),
  Review: reviewModel(),
  Book: bookModel(),
};
