const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // Подключение базы данных
const Show = require('./models/Show'); // Модель сериалов

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Подключение к базе данных
connectDB();

// API endpoints
app.get('/api/shows', async (req, res) => {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/shows', async (req, res) => {
  try {
    const show = new Show(req.body);
    await show.save();
    res.json(show);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
