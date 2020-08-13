'use strict';

/** * Module dependencies. */
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Train = mongoose.model('Train');


/** * List */
exports.index = async(function*(req, res) {
  Train.find(function (error, items) {
    if (error) {
      res.status(500).send(error);
        return;
    }
    res.json(items);
  });
});

/** * Create an train */
exports.create = async(function*(req, res) {
  var train = new Train(request.body);
  train.save();
  res.status(201).send(train);
});


/** * Update train */
exports.update = async(function*(req, res) {
  var id = request.params.id;
  Train.findOne({ id: id }, function (error, train) {

    if (error) {
      res.status(500).send(error);
      return;
    }

    if (train) {
      train.name = request.body.display_name;
      train.number = request.body.number;
      train.coordinates = request.body.coordinates;
      train.save();
      res.json(train);
      return;
    }

    res.status(404).json({
      message: 'train with id ' + id + ' was not found.'
    });
  });
});

/** * Delete an train */
exports.destroy = async(function*(req, res) {  
  var id = request.params.id;
  Train.findOne({ id: id }, function (error, train) {    
    if (error) {
      res.status(500).send(error);
      return;
    }

    if (train) {
      train.remove(function (error) {
        if (error) {
          res.status(500).send(error);
          return;
        }
        res.status(200).json({
          'message': 'train with id ' + id + ' was removed.'
        });
      });

    } else {
      res.status(404).json({
        message: 'Item with id ' + id + ' was not found.'
      });
    }
  });
});