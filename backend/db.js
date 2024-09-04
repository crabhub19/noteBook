const mongoose = require('mongoose');
const mongooseUrl = 'mongodb://atlas-sql-66d8352d6b017a5126753efb-b5ugo.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin/sample_mflix'
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
