const express = require('express');
const cors = require('cors');
require('dotenv').config();

const morgan = require('morgan');
const logger = require('./config/logger');

const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerDocs = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Morgan -> envia logs para Winston
app.use(morgan("combined", {
  stream: {
    write: (msg) => logger.info(msg.trim())
  }
}));

// Rotas
app.use('/auth', authRoutes);
app.use('/', orderRoutes);

// Swagger
swaggerDocs(app);

// Middleware global de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("íº€ Servidor rodando na porta " + PORT);
});
