const express = require("express");
const path = require("path");
const users = require("../users");

const router = express.Router();

// Página inicial
router.get("/", (req, res) => {
  if (req.session.username) {
    return res.send(`
      <html>
        <head>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <div class="container">
            <p>Bem-vindo, ${req.session.username}! Você está autenticado usando <strong>sessões</strong>.</p>
            <a href="/logout">Logout</a>
          </div>
        </body>
      </html>
    `);
  }

  if (req.cookies.username) {
    return res.send(`
      <html>
        <head>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <div class="container">
            <p>Bem-vindo, ${req.cookies.username}! Você está autenticado usando <strong>cookies</strong>.</p>
            <a href="/logout">Logout</a>
          </div>
        </body>
      </html>
    `);
  }

  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Página de login
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

// Processa o login
router.post("/login", (req, res) => {
  const { username, password, method } = req.body;

  if (users[username] && users[username] === password) {
    if (method === "cookie") {
      res.cookie("username", username, { httpOnly: true });
    } else if (method === "session") {
      req.session.username = username;
    }
    return res.redirect("/");
  }

  res.sendFile(path.join(__dirname, "../views/error.html"));
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("username");
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;