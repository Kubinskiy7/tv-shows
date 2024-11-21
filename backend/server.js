const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // Подключение базы
const Show = require('./models/Show'); // Модель сериалов

const app = express();

app.use(cors());
app.use(bodyParser.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
