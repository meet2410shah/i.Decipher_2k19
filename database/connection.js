"use strict";
const mongoose = require('mongoose');
const config = require('config');

// ES6 Promises
mongoose.Promise = global.Promise;

// Connection to the data base
const CONNECTION_URL = config.get('SERVER.DATABASE.CONNECTION_STRING');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);
mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true })
    .then(() =>{
        console.log("Connection Successful:", CONNECTION_URL);
    })
    .catch((err) => {
        console.log("ERROR:", err);
    })
