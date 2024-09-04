const connectToDatabase = require('./db');
const express = require('express');
const cors = require('cors');
connectToDatabase();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// avialble routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/note'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})