const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/your_database_name?directConnection=true';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;
