const express = require(`express`);
const router = express.Router();
const books = require(`../data`);
const Joi = require(`joi`);

const bookSchema = Joi.object({
  title: Joi.string().required().label(`Título`),
  author: Joi.string().required().label(`Autor`),
});

router.get(`/`, (req, res, next) => {
  try {
    res.json(books);
  } catch (err) {
    next(err);
  }
});

router.get(`/:id`, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const book = books.find((l) => l.id === id);

    if (!book) {
      const error = new Error(`Libro no encontrado`);
      error.status = 404;
      throw error;
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
});

router.post(`/`, (req, res, next) => {
  try {
    const { error, value } = bookSchema.validate(req.body);
    if (error) {
      const validationError = new Error(`Error de validación`);
      validationError.status = 400;
      validationError.details = error.details.map((detail) => detail.message);
      throw validationError;
    }
    const { title, author } = value;
    const newBook = {
      id: books.length + 1,
      title,
      author,
    };

    books.push(newBook);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
});

router.put(`/:id`, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { error, value } = bookSchema.validate(req.body);
    if (error) {
      const validationError = new Error(`Error de validación`);
      validationError.status = 400;
      validationError.details = error.details.map((detail) => detail.message);
      throw validationError;
    }

    const { title, author } = value;

    const book = books.find((l) => l.id === id);

    if (!book) {
      const error = new Error(`Libro no encontrado`);
      error.status = 404;
      throw error;
    }

    book.title = title || book.title;
    book.author = author || book.author;

    res.json(book);
  } catch (err) {
    next(err);
  }
});

router.delete(`/:id`, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = books.findIndex((l) => l.id === id);

    if (index === -1) {
      const error = new Error("Libro no encontrado");
      error.status = 404;
      throw error;
    }

    const bookDelete = books.splice(index, 1);
    res.json(bookDelete[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
