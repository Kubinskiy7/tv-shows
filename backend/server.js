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

// Добавление нового сезона к сериалу
app.post('/api/shows/:id/seasons', async (req, res) => {
  try {
    const { id } = req.params; // ID сериала
    const newSeason = req.body; // Новый сезон из тела запроса

    // Находим сериал по ID
    const show = await Show.findById(id);
    if (!show) {
      return res.status(404).json({ error: 'Сериал не найден' });
    }

    // Добавляем новый сезон
    show.seasons.push(newSeason);

    // Сохраняем изменения
    await show.save();

    res.json(show);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Добавление нового эпизода к сезону
app.post('/api/shows/:id/seasons/:seasonNumber/episodes', async (req, res) => {
  try {
    const { id, seasonNumber } = req.params; // ID сериала и номер сезона
    const newEpisode = req.body; // Новый эпизод из тела запроса

    // Находим сериал по ID
    const show = await Show.findById(id);
    if (!show) {
      return res.status(404).json({ error: 'Сериал не найден' });
    }

    // Находим нужный сезон
    const season = show.seasons.find((s) => s.number === parseInt(seasonNumber));
    if (!season) {
      return res.status(404).json({ error: 'Сезон не найден' });
    }

    // Добавляем новый эпизод
    season.episodes.push(newEpisode);

    // Сохраняем изменения
    await show.save();

    res.json(show);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
