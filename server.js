const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./src/routes');

dotenv.config();
const app = express();

//Avoid deprecation warning.
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true,useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));



app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));