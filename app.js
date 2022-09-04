const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const cardRoutes = require("./routes/card");
const NotFoundErr = require("./errors/not_found_error_class")
const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/mestodb");

app.use((req, res, next) => {
  req.user = {
    _id: "63139a119929a10f0a0bdc43", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);
app.use("/*", (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
