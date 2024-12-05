const { Book } = require('../models');

exports.getBooks = async () => {
    try {
        const books = await Book.findAll();
        return books;
    } catch (error) {
        throw new Error('Erro ao buscar livros: ' + error.message);
    }
};

exports.getBookById = async (id) => {
    try {
        const book = await Book.findOne({ where: { id } });
        return book;
    } catch (error) {
        throw new Error('Erro ao buscar livro: ' + error.message);
    }
};

exports.createBook = async (book) => {
    try {
        const newBook = await Book.create(book);
        return newBook;
    } catch (error) {
        throw new Error('Erro ao criar livro: ' + error.message);
    }
};

exports.deleteBook = async (id) => {
    try {
        const deletedCount = await Book.destroy({ where: { id } });

        if (deletedCount === 0) {
            throw new Error('Livro não encontrado');
        }

        return deletedCount !== 0;
    } catch (error) {
        throw new Error('Erro ao deletar livro: ' + error.message);
    }
};

exports.updateBook = async (id, book) => {
    try {
        const [rowsUpdated] = await Book.update(book, { where: { id } });

        if (rowsUpdated === 0) {
            throw new Error('Livro não encontrado para atualização');
        }

        const updatedBook = await Book.findOne({ where: { id } });
        return updatedBook;
    } catch (error) {
        throw new Error('Erro ao atualizar livro: ' + error.message);
    }
};