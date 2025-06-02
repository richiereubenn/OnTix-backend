require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const rootRoutes = require('./routes/rootRoute');
const eventRoutes = require('./routes/eventRoute');
const historyRoutes = require('./routes/historyRoute');
const resaleRoutes = require('./routes/resaleRoute');
const errorHandler = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', rootRoutes);
app.use('/api', eventRoutes);
app.use('/api', historyRoutes);
app.use('/api', resaleRoutes);

app.use(errorHandler);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('DB connection error:', err));
