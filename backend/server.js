const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Show = require('./models/Show');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Подключение к базе данных
const mongoURI = process.env.MONGO_URI || 'your-mongodb-connection-string';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// API endpoints
app.get('/api/shows', async (req, res) => {
  const shows = await Show.find();
  res.json(shows);
});

app.post('/api/shows', async (req, res) => {
  const newShow = new Show(req.body);
  const savedShow = await newShow.save();
  res.json(savedShow);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
