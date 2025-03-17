import React, { useEffect, useState } from "react";
import axios from "axios";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./styles/styles.css"; // ✅ Import CSS

function App() {
    const [books, setBooks] = useState([]);
    const [bookToUpdate, setBookToUpdate] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        axios.get("http://localhost:5000/books")
            .then((res) => setBooks(res.data))
            .catch((err) => console.error("Error fetching books:", err));
    };

    const addBook = (book) => {
        axios.post("http://localhost:5000/books", book)
            .then(() => fetchBooks())
            .catch((err) => console.error("Error adding book:", err));
    };

    const deleteBook = (bookNumber) => {
        axios.delete(`http://localhost:5000/books/${bookNumber}`)
            .then(() => fetchBooks())
            .catch((err) => console.error("Error deleting book:", err));
    };

    const updateBook = (book) => {
        setBookToUpdate(book);
    };

    const saveUpdatedBook = (book) => {
        axios.put(`http://localhost:5000/books/${book.bookNumber}`, book)
            .then(() => {
                fetchBooks();
                setBookToUpdate(null);
            })
            .catch((err) => console.error("Error updating book:", err));
    };

    return (
        <div className="container">
            <h1>Book Store</h1>
            <BookForm addBook={addBook} bookToUpdate={bookToUpdate} saveUpdatedBook={saveUpdatedBook} />
            <BookList books={books} deleteBook={deleteBook} updateBook={updateBook} />
        </div>
    );
}

export default App;