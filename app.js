require('dotenv').config();

const express = require('express');
const connectDb = require('./config/db.config');

connectDb();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.use('/todos', require('./routes/todo.routes'));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port: ${process.env.PORT}`)
);
