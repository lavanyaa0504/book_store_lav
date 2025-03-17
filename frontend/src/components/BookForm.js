import React, { useState, useEffect } from "react";

function BookForm({ addBook, bookToUpdate, saveUpdatedBook }) {
    const [book, setBook] = useState({ bookNumber: "", title: "", author: "", price: "" });

    useEffect(() => {
        if (bookToUpdate) {
            setBook(bookToUpdate);
        }
    }, [bookToUpdate]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (bookToUpdate) {
            saveUpdatedBook(book);
        } else {
            addBook(book);
        }
        setBook({ bookNumber: "", title: "", author: "", price: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="bookNumber" placeholder="Book Number" value={book.bookNumber} onChange={handleChange} required />
            <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleChange} required />
            <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={book.price} onChange={handleChange} required />
            <button type="submit">{bookToUpdate ? "Update Book" : "Add Book"}</button>
        </form>
    );
}

export default BookForm;