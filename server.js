'use strict';
/** * Module dependencies */

require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const socket = require("socket.io");

const models = join(__dirname, 'app/models');
const port = process.env.PORT || 3000;



const app = express();
const connection = connect();

module.exports = {
  app,
  connection
};

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
require('./config/express')(app);
require('./config/routes')(app);

connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen() {
  if (app.get('env') === 'test') return;
  const server = app.listen(port);
  initSocket(server)
  console.log('Express app started on port ' + port);
}

function connect() {
  var options = { keepAlive: 1, useNewUrlParser: true };
  mongoose.connect(config.db, options);
  return mongoose.connection;
}


function initSocket(server) {
  const io = socket(server);

  //setup event listener
  io.on("connection", socket => {
    console.log("user connected");

    socket.on("disconnect", function() {
      console.log("user disconnected");
    });

    socket.on("updateStatus", data => {
      socket.broadcast.emit("trainStatus", {
        message: data.message
      });
    });
  });
}