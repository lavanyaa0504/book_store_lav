import React from "react";

function BookList({ books, deleteBook, updateBook }) {
    return (
        <div className="book-list">
            <h2>📚 Book Collection</h2>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price ($)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book.bookNumber} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                            <td>{book.bookNumber}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>${book.price.toFixed(2)}</td>
                            <td className="actions">
                                <button className="update-btn" onClick={() => updateBook(book)}>✏️ Update</button>
                                <button className="delete-btn" onClick={() => deleteBook(book.bookNumber)}>🗑️ Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
