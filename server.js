const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory book storage
let books = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: "Title and author are required" });
    }
    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update book by ID
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    const book = books.find(b => b.id === parseInt(id));
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.json(book);
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(b => b.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);
    res.json(deletedBook[0]);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:3000/books`);
});
