const express = require(`express`);
const app = express();
app.use(express.json());

//Importamos el Router de Libros
const booksRouter = require(`./routes/books`);

// Importamos el Middleware Error Handler
const errorHandler = require(`./middlewares/errorHandler`);

app.use(`/books`, booksRouter);

app.use(errorHandler);

const port = 3000;

app.listen(port, () =>{
    console.log(`Servidor iniciado en el puerto: ${port}`);
});