const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://alainmilheiro:fV3LJgt9%40@cluster0.nnfl3wq.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));