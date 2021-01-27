

# Sessions

A "session" is a "browsing session" - it's how you keep track of a single user as they move from page to page on your site.

Especially useful when a user is logged in.


## Install the `session-file-store` and `express-session` modules

This keeps the session information on the server's hard drive.

```sh
npm i session-file-store express-session
```

## Add sessions folder to `.gitignore`


## Import and configure the session middleware in `index.js`

```js
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session({
    store: new FileStore(),  // no options for now
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true,
    //maxAge: 1000 * 60 * 60 * 24 * 7,
    cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

```

Make sure to add a `SESSION_SECRET` random string to your `.env` (and a placeholder in your `dist.env`).

## Tell `nodemon` to ignore the `sessions` folder:

```json
  "nodemonConfig": {
    "ignore": [
      "sessions/*"
    ]
  },
```

