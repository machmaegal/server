// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/users', indexRoutes);
const authorization = require('./routes/auth.routes');
app.use('/auth', authorization);
const foodRoute = require('./routes/food.routes');
app.use('/food', foodRoute);
const drinkRoute = require('./routes/drink.routes');
app.use('/drink', drinkRoute);
const users = require('./routes/user.routes');
app.use('/users', users);
const orderRoute = require('./routes/order.routes');
app.use('/orders', orderRoute);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
