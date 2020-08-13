/** Module dependencies. */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');

const winston = require('winston');
const helpers = require('view-helpers');
const config = require('./');
const pkg = require('../package.json');
const env = process.env.NODE_ENV || 'development';

module.exports = function(app) {
  app.use(helmet());

  // Static files middleware
  app.use(express.static(config.root + '/public'));

  // Use winston on production & Logging
  let log;
  if (env !== 'development') {
    log = {
      stream: {
        write: msg => winston.info(msg)
      }
    };
  } else {
    log = 'dev';
  }
  if (env !== 'test') app.use(morgan(log));

  // set views path and default layout
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'pug');

  // expose package.json to views
  app.use(function(req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(
    methodOverride(function(req) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );

  app.use(helpers(pkg.name));

};
