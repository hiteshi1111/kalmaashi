const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/customer', require('./controllers/user.controller'));
app.use('/api/contact', require('./controllers/contact.controller'));
app.use('/api/newsLetter', require('./controllers/newsletter.controller'));
app.use('/api/candidate', require('./controllers/candidate.controller'))
app.use('/api/order', require('./controllers/order.controller'));
app.use('/api/payment', require('./controllers/payment.controller'));
app.all('*', (req, res) => {
  res.status(404).send("Ye kahan aagye aap!");
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI, )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
