// username : Sumeet
// password: sumeet123
// mongodb+srv://Sumeet:sumeet123@cluster0.glvqfuj.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());


const productsRouter = require('./routes/Products');
const usersRouter = require('./routes/Users');
const commentsRouter = require('./routes/Comments');
const ordersRouter = require('./routes/Orders');
const cartsRouter = require('./routes/Carts');

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/orders', ordersRouter);


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