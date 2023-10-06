const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const passport = require('./middleware/passport');
const logger = require('./middleware/logger');
const error404 = require('./middleware/error-404');
const indexRouter = require('./routes/main');
const userRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const socketIO = require('socket.io');
const socketCallback = require('./sockets/socket');

const app = express();

const server = http.Server(app);
const io = socketIO(server);

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.deserializeUser());

app.use(logger);
app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);
app.use(error404);

io.on('connection', socketCallback);

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB);
        app.listen(PORT);   
    } catch(e) {
        console.log(e);
    }  
}

const UrlDB = process.env.UrlDB;
const PORT = process.env.PORT || 3000;
start(PORT, UrlDB);

