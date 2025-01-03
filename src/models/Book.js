import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, require: true },
    publisher: { type: String },
    price: { type: Number },
    pages: { type: Number },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: true,
    },
  },
  { versionKey: false }
);

const Book = mongoose.model("books", bookSchema);

export default Book;
