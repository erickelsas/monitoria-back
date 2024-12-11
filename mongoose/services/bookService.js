const { Book } = require('../models');

exports.getBooks = async () => {
    try {
        const books = await Book.find(); // Retorna todos os documentos
        return books;
    } catch (error) {
        throw new Error('Erro ao buscar livros: ' + error.message);
    }
};

exports.getBookById = async (id) => {
    try {
        const book = await Book.findById(id); // Busca pelo ID
        if (!book) {
            throw new Error('Livro não encontrado');
        }
        return book;
    } catch (error) {
        throw new Error('Erro ao buscar livro: ' + error.message);
    }
};

exports.createBook = async (bookData) => {
    try {
        const newBook = new Book(bookData); // Cria um novo documento
        await newBook.save(); // Salva no banco
        return newBook;
    } catch (error) {
        throw new Error('Erro ao criar livro: ' + error.message);
    }
};

exports.deleteBook = async (id) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(id); // Deleta pelo ID
        if (!deletedBook) {
            throw new Error('Livro não encontrado');
        }
        return true;
    } catch (error) {
        throw new Error('Erro ao deletar livro: ' + error.message);
    }
};

exports.updateBook = async (id, bookData) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, bookData, { 
            new: true, // Retorna o documento atualizado
            runValidators: true // Valida os dados antes da atualização
        });
        if (!updatedBook) {
            throw new Error('Livro não encontrado para atualização');
        }
        return updatedBook;
    } catch (error) {
        throw new Error('Erro ao atualizar livro: ' + error.message);
    }
};