const mongoose = require('mongoose');
const mongooseUrl = 'mongodb://localhost:27017/'
async function connectToDatabase() {
  try {
    await mongoose.connect(mongooseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}



module.exports = connectToDatabase;