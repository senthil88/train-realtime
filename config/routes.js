'use strict';

/** * Module dependencies. */

const home = require('../app/controllers/home');
const stations = require('../app/controllers/api/stations');
const trains = require('../app/controllers/api/trains');



module.exports = function(app) {
  app.get('/', home.index);
  app.get('/admin', home.admin);

  // Station routes
  app.get('api/stations', stations.index);
  app.post('api/stations',  stations.create);
  app.put('api/stations/:id', stations.update);
  app.delete('api/stations/:id', stations.destroy);

  // Train routes
  app.get('api/trains', trains.index);
  app.post('api/trains',  trains.create);
  app.put('api/trains/:id', trains.update);
  app.delete('api/trains/:id', trains.destroy);

  /** * Error handling */
  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf('not found') ||
        ~err.message.indexOf('Cast to ObjectId failed'))
    ) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
