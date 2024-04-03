// username : Sumeet
// password: sumeet123
// mongodb+srv://Sumeet:sumeet123@cluster0.gnmy6xu.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://Sumeet:sumeet123@cluster0.glvqfuj.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());

// Specify the port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Connect to MongoDB database

mongoose.connect('mongodb+srv://Sumeet:sumeet123@cluster0.glvqfuj.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));