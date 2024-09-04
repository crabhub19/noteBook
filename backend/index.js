const connectToDatabase = require('./db');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
connectToDatabase();

// mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.log(err));

const app = express()
const port = process.env.PORT || 4000;

// app.use(cors());
app.use(cors({
  origin: 'https://notebook-frontend-84bd.onrender.com'
}));
app.options('*', cors());

app.use(express.json());
// avialble routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/note'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
