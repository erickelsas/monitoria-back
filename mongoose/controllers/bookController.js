const { bookService } = require('../services');
const mongoose = require('mongoose');

exports.getBooks = async(req, res) => {
    try {
        const books = await bookService.getBooks();

        if (!books || books.length === 0) {
            return res.status(404).json({ message: 'Nenhum livro encontrado.' });
        }

        return res.status(200).json({
            message: 'Livros encontrados com sucesso.',
            data: books,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao buscar livros.',
            error: error.message,
        });
    }
};

exports.getBookById = async(req, res) => {
    try {
        const id = req.params.id;

        // Validação do ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Id inválido. Deve ser um ObjectId válido do MongoDB.' });
        }

        const book = await bookService.getBookById(id);

        if (!book) {
            return res.status(404).json({ message: 'Nenhum livro encontrado.' });
        }

        return res.status(200).json({
            message: 'Livro encontrado com sucesso.',
            data: book,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao buscar livro.',
            error: error.message,
        });
    }
};

exports.createBook = async(req, res) => {
    try {
        const book = req.body;

        if (!book) {
            return res.status(400).json({ message: 'Não existe livro enviado no body.' });
        }

        const bookWithId = await bookService.createBook(book);

        if (!bookWithId) {
            return res.status(400).json({ message: 'Não foi possível criar o livro.' });
        }

        return res.status(201).json({
            message: 'Livro criado com sucesso.',
            data: bookWithId,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao criar livro.',
            error: error.message,
        });
    }
};

exports.updateBook = async(req, res) => {
    const bookId = req.params.id;
    const book = req.body;

    // Validação do ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Id inválido. Deve ser um ObjectId válido do MongoDB.' });
    }

    try {
        const updatedBook = await bookService.updateBook(bookId, book);

        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }

        return res.status(200).json({
            message: 'Livro atualizado com sucesso.',
            data: updatedBook,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao atualizar livro.',
            error: error.message,
        });
    }
};

exports.deleteBook = async(req, res) => {
    try {
        const id = req.params.id;

        // Validação do ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Id inválido. Deve ser um ObjectId válido do MongoDB.' });
        }

        const success = await bookService.deleteBook(id);

        if (!success) {
            return res.status(400).json({ message: 'Não foi possível deletar o livro.' });
        }

        return res.status(200).json({
            message: 'Livro deletado com sucesso.',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao deletar livro.',
            error: error.message,
        });
    }
};