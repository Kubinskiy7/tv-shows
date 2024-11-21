const mongoose = require('mongoose');

// Подключение к MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Получаем строку подключения из .env
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
