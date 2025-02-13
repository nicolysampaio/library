import Book from "../models/Book.js";

class BookController {
  static getAllBooks = async (req, res) => {
    try {
      const books = await Book.find().populate("author").exec();

      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching the books.",
        error: error.message,
      });
    }
  };

  static getBooksByPublisher = async (req, res) => {
    try {
      const booksByPublisher = await Book.find({
        publisher: req.query.publisher,
      });

      res.status(200).json(booksByPublisher);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching the books.",
        error: error.message,
      });
    }
  };

  static getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id)
        .populate("author", "name")
        .exec();

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching the book.",
        error: error.message,
      });
    }
  };

  static createBook = async (req, res) => {
    try {
      let bookData = new Book(req.body);

      const book = await bookData.save();

      res.status(201).json({ message: "Book created with success!", book });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while creating the book.",
        error: error.message,
      });
    }
  };

  static updateBook = async (req, res) => {
    try {
      await Book.findByIdAndUpdate(req.params.id, { $set: req.body });

      res.status(201).json({ message: "Book updated with success!" });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while updating the book.",
        error: error.message,
      });
    }
  };

  static deleteBook = async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);

      res.status(201).json({ message: "Book deleted with success!" });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while deleting the book.",
        error: error.message,
      });
    }
  };
}

export default BookController;
