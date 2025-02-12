import mongoose from "mongoose";
import { Author } from "../models/Author.js";

class AuthorController {
  static async getAllAuthors(req, res) {
    try {
      const authors = await Author.find();

      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching the authors.",
        error: error.message,
      });
    }
  }

  static async getAuthorById(req, res) {
    try {
      const id = req.params.id;
      const author = await Author.findById(id);

      if (author !== null) {
        res.status(200).send(author);
      } else {
        res.status(404).send({ message: "ID not found" });
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "ID format incorrect" });
      } else {
        res.status(500).send({
          message: "An error occurred while fetching the author.",
          error: error.message,
        });
      }
    }
  }

  static async createAuthor(req, res) {
    try {
      let author = new Author(req.body);
      const authorResult = await author.save();

      res.status(201).send(authorResult.toJSON());
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while creating the author.",
        error: error.message,
      });
    }
  }

  static async updateAuthor(req, res) {
    try {
      const id = req.params.id;
      await Author.findByIdAndUpdate(id, { $set: req.body });

      res.status(201).send({ message: "Author updated with success!" });
    } catch (error) {
      res.status(500).send({
        message: "An error occurred while updating the author.",
        error: error.message,
      });
    }
  }

  static async deleteAuthor(req, res) {
    try {
      const id = req.params.id;
      await Author.findByIdAndDelete(id);

      res.status(201).send({ message: "Author deleted with success!" });
    } catch (error) {
      res.status(500).send({
        message: "An error occurred while deleting the author.",
        error: error.message,
      });
    }
  }
}

export default AuthorController;
