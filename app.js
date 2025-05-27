const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const eventRoutes = require('./routes/eventRoute');
const historyRoutes = require('./routes/historyRoute');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', eventRoutes);
app.use('/api', historyRoutes);

app.use(errorHandler);

module.exports = app;
