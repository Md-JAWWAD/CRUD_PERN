const express = require('express');
const error = require('./middlewares/error.middleware');
const app = express()
const cors = require('cors');
const route = require('./routes/route');
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(error)
app.use('/', route)
// For Testing is router working or not
app.get('/test', (req, res) => res.send('Works!'));

module.exports = app;