trackgain
=========

Track your gains. Monitor your progress.

Setting Up Development Environment
=========

This application requires [Node.js](http://nodejs.org/) and [MongoDB](http://www.mongodb.org/).

Its API is under `api/` and it runs on [express](http://expressjs.com/).

From a fresh clone (or zip download) perform the following steps:

1. Run `npm install` to get all the main dependencies.
2. Run `bower install` to get all js libraries and components.
3. Run `grunt` to compile and watch for changes.


Or if you're keen use the "one liner", simply copy, paste it & run it into your terminal.
```
npm install && bower install && grunt
```

Developing
========
1. `cd` into `dist` and run a webserver. I like `python -m SimpleHTTPServer [port]`.
2. `cd` into `api` and run `nodemon app.js`. Note that [nodemon](https://github.com/remy/nodemon) is preferred to be installed globally (using `npm install -g nodemon). It's very useful.
3. Run `grunt && grunt watch` & happy coding.
