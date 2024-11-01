const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log(`Servidor ouvindo a porta 3000`);
});