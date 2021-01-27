require('dotenv').config();    // don't forget to require dotenv

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const es6Renderer = require('express-es6-template-engine');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const {
    homeController
} = require('./controllers');

const {
    userRouter,
    todoRouter
} = require('./routers');

const { requireLogin } = require('./auth')

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const logger = morgan('tiny');

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(session({
    // store: new FileStore({logFn: function(){}}),  // no options for now
    store: new FileStore(),  // no options for now
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));



app.use(logger);
// Disabling for local development
// app.use(helmet());

// Parse any form data from POST requests
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', homeController.home);

console.log("Using API routes");
app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);

app.get('/members-only', requireLogin, (req, res) => {
    console.log(req.session.user);
    const { username } = req.session.user;
    res.send(`

<h1>Hi ${username}!</h1>
<a href="/todos">View Todo list</a>
<br>
<a href="/users/logout">Log out</a>
    `);
});

app.get('/unauthorized', (req, res) => {
    res.send(`You shall not pass!`);
});


server.listen(PORT, HOST, () => {
    console.log(`Listening at http://${HOST}:${PORT}`);
});
