import Book from "../models/Book.js";

class BookController {
  static async getAllBooks(req, res) {
    try {
      const books = await Book.find({});

      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching the books.",
        error: error.message,
      });
    }
  }

  static async getBookById(req, res) {
    try {
      const book = await Book.findById(req.params.id);

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching the book.",
        error: error.message,
      });
    }
  }

  static async createBook(req, res) {
    try {
      const book = await Book.create(req.body);

      res
        .status(201)
        .json({ message: "Book created with success!", Book: book });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while creating the book.",
        error: error.message,
      });
    }
  }

  static async updateBook(req, res) {
    try {
      await Book.findByIdAndUpdate(req.params.id);

      res.status(201).json({ message: "Book updated with success!" });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while updating the book.",
        error: error.message,
      });
    }
  }

  static async deleteBook(req, res) {
    try {
      await Book.findByIdAndDelete(req.params.id);

      res.status(201).json({ message: "Book deleted with success!" });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while deleting the book.",
        error: error.message,
      });
    }
  }
}

export default BookController;
