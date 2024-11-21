const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  poster: { type: String, required: true },
  seasons: [
    {
      seasonNumber: Number,
      episodes: [
        {
          episodeNumber: Number,
          title: String,
          rating: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Show', ShowSchema);
