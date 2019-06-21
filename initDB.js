const mongoose = require('mongoose');
const config = require('config');

module.exports = function initConnection(callback) {
  const connectionString = config.get('db').connection;
  const { option } = config.get('db');
  mongoose.connect(connectionString, option);
  const db = mongoose.connection;
  db.on('error', function(err) {
    console.error('Failed to connect to database');
    console.error(err);
    process.exit(1);
  });

  db.once('open', function() {
    console.info('Connected to database');
    callback();
  });
};
