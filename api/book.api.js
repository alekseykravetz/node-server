const express = require('express');
const router = express.Router();

const dataAccess = require('../data-access');


router.get('/api/v1/books', async (req, res) => {

    const books = await dataAccess.getBooks();

    res.json(books);
});

router.post('/api/v1/book', async (req, res) => {
    const book = req.body;
    const createdBook = await dataAccess.createBook(book);
    res.json(createdBook);
});

router.put('/api/v1/book', async (req, res) => {
    const book = req.body;
    const result = await dataAccess.updateBook(book);
    if (result.matchedCount === 1) res.json(book);
    else res.json(book); //todo
});

router.delete('/api/v1/book/:id', async (req, res) => {
    const bookId = req.params.id;
    const result = await dataAccess.deleteBook(bookId);
    res.json(result.deletedCount === 1);
});


module.exports = router;
