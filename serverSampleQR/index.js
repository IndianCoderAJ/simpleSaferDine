const express = require('express');
const mongoose = require('mongoose');
const customer = require('./routers/customer');
const cookieParser = require('cookie-parser');
const https = require('https');
const http = require('http');
const app = express();

// db connections
const db = mongoose.connect('mongodb://localhost:27017/simpleQR', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log('db is connected....');
    })
    .catch(err => {
        console.log('db is not connected', +err);
});


// CORS Request
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control,authtoken");
    next();
}
app.use(allowCrossDomain);

app.use(express.json());
app.use(express.static(__dirname));
app.use(cookieParser());

app.use(express.static('public'));

app.use('/customer', customer);


if (process.env.NODE_ENV == 'production') {
    port = process.env.PORT || 4000;
} else {
    port = 4000;
}


const server = http.createServer(app);


if (process.env.NODE_ENV === 'production') {
    server.listen(port, () => {
        console.log('server is running as production on port:' + port);
        console.log(process.env.NODE_ENV);

    });

} else {

    server.listen(port, () => {
        console.log('server is running as development on port:' + port);
        console.log(process.env.NODE_ENV);

    });
}