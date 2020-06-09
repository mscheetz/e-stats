const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const cron = require('node-cron');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const whitelistOrigins = [
    'http://localhost:4200',
    'https://volume-watcher.herokuapp.com/'
    ];

const corsOptions = {
    origin: function(origin, callback) {
        let isWhitelisted = whitelistOrigins.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    optionsSuccessStatus: 200
};

app.set('server', server);

app.use(bodyParser.json());
app.use(compression());
app.use(cors(corsOptions));
app.use(helmet());
app.use(async(req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('server')
   .listen(port, () => {
       console.log(`App started at ${new Date}. App listening at port ${port}`)
    });