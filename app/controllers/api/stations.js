'use strict';

/** * Module dependencies. */
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Station = mongoose.model('Station');


/** * List */
exports.index = async(function*(req, res) {
  Station.find(function (error, items) {
    if (error) {
      res.status(500).send(error);
        return;
    }
    res.json(items);
  });
});

/** * Create an station */
exports.create = async(function*(req, res) {
  var station = new Station(request.body);
  station.save();
  res.status(201).send(station);
});


/** * Update station */
exports.update = async(function*(req, res) {
  var id = request.params.id;
  Station.findOne({ id: id }, function (error, station) {

    if (error) {
      res.status(500).send(error);
      return;
    }

    if (station) {
      station.display_name = request.body.display_name;
      station.city = request.body.city;
      station.state = request.body.state;
      station.pincode = request.body.pincode;
      station.coordinates = request.body.coordinates;
      station.save();
      res.json(station);
      return;
    }

    res.status(404).json({
      message: 'station with id ' + stationId + ' was not found.'
    });
  });
});

/** * Delete an station */
exports.destroy = async(function*(req, res) {  
  var id = request.params.id;
  Station.findOne({ id: id }, function (error, station) {    
    if (error) {
      res.status(500).send(error);
      return;
    }

    if (station) {
      station.remove(function (error) {
        if (error) {
          res.status(500).send(error);
          return;
        }
        res.status(200).json({
          'message': 'Station with id ' + id + ' was removed.'
        });
      });

    } else {
      res.status(404).json({
        message: 'Item with id ' + id + ' was not found.'
      });
    }
  });
});