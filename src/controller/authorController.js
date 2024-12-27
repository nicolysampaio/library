import { Author } from "../models/Author.js";

class AuthorController {
  static getAllAuthors = async (req, res) => {
    try {
      const authors = await Author.find({});

      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching the authors.",
        error: error.message,
      });
    }
  };

  static getAuthorById = async (req, res) => {
    try {
      const author = await Author.findById(req.params.id);

      res.status(200).json(author);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching the author.",
        error: error.message,
      });
    }
  };

  static createAuthor = async (req, res) => {
    try {
      let authorData = new Author(req.body);

      const author = await authorData.save();

      res.status(201).json({ message: "Author created with success!", author });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while creating the author.",
        error: error.message,
      });
    }
  };

  static updateAuthor = async (req, res) => {
    try {
      await Author.findByIdAndUpdate(req.params.id, { $set: req.body });

      res.status(201).json({ message: "Author updated with success!" });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while updating the author.",
        error: error.message,
      });
    }
  };

  static deleteAuthor = async (req, res) => {
    try {
      await Author.findByIdAndDelete(req.params.id);

      res.status(201).json({ message: "Author deleted with success!" });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while deleting the author.",
        error: error.message,
      });
    }
  };
}

export default AuthorController;
