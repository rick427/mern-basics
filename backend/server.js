const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

//initialize our app
const app = express();

//database connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => console.log(`Mongodb connection established`));

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


//routes
const exerciseRoute = require('./routes/exercise');
const userRoute = require('./routes/user');

app.use('/api/exercises', exerciseRoute);
app.use('/api/users', userRoute);

//port establishment
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));