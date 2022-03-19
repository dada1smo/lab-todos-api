require('dotenv').config();

const express = require('express');
const connectDb = require('./config/db.config');
const cors = require('cors');

connectDb();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.use('/auth', require('./routes/auth.routes'));

app.use(require('./middlewares/auth.middleware'));

app.use('/todos', require('./routes/todo.routes'));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port: ${process.env.PORT}`)
);
