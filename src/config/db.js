const mongoose = require('mongoose');
require('dotenv').config();

console.log('MONGO_URI:', process.env.MONGO_URI);
const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log("Error connecting to MongoDB")
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;