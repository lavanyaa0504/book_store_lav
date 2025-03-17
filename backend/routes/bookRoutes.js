const express = require("express");
const Book = require("../models/BookModel");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { bookNumber, title, author, price } = req.body;
        const existingBook = await Book.findOne({ bookNumber });

        if (existingBook) {
            return res.status(400).json({ message: "Book number already exists" });
        }

        const newBook = new Book({ bookNumber, title, author, price });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error });
    }
});

// ✅ Read (Get all books)
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
});

// ✅ Update a book
router.put("/:bookNumber", async (req, res) => {
    try {
        const updatedBook = await Book.findOneAndUpdate(
            { bookNumber: req.params.bookNumber },
            req.body,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
    }
});

// ✅ Delete a book
router.delete("/:bookNumber", async (req, res) => {
    try {
        const deletedBook = await Book.findOneAndDelete({ bookNumber: req.params.bookNumber });

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }
});

module.exports = router;
