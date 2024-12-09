const express = require('express');
const router = express.Router();
const { sequelize, Book } = require('../models'); 

router.get('/install/', async (req, res) => {
  const books = [
    {
      title: "O Senhor dos Anéis",
      author: "J.R.R. Tolkien",
      publishedYear: "1954",
      genre: "Fantasia"
    },
    {
      title: "1984",
      author: "George Orwell",
      publishedYear: "1949",
      genre: "Ficção Distópica"
    },
    {
      title: "O Pequeno Príncipe",
      author: "Antoine de Saint-Exupéry",
      publishedYear: "1943",
      genre: "Fábula"
    },
    {
      title: "Dom Casmurro",
      author: "Machado de Assis",
      publishedYear: "1899",
      genre: "Romance"
    },
    {
      title: "Harry Potter e a Pedra Filosofal",
      author: "J.K. Rowling",
      publishedYear: "1997",
      genre: "Fantasia"
    }
  ];

  try {
    await sequelize.sync({ force: true });
    console.log("Banco de dados sincronizado com sucesso.");

    await Book.bulkCreate(books, { validate: true });
    console.log("Livros foram adicionados com sucesso.");

    return res.status(201).json({ message: "Livros instalados com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar livros:", error.message);
    return res.status(500).json({ message: "Erro ao instalar os livros.", error: error.message });
  }
});

module.exports = router;
