const mongoose = require('mongoose');

// Схема для сериалов
const ShowSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Название сериала
  seasons: [
    {
      number: { type: Number, required: true }, // Номер сезона
      episodes: [
        {
          title: { type: String, required: true }, // Название серии
          rating: { type: Number, required: true }, // Рейтинг серии
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Show', ShowSchema);
