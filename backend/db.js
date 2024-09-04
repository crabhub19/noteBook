const mongoose = require('mongoose');
const mongooseUrl = 'mongodb+srv://crab:0000@notebookdb.w11im.mongodb.net/?retryWrites=true&w=majority&appName=noteBookDB'
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
