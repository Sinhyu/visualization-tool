const debug = require('debug')('server:db');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const TABLE_SIMULATION = 'simulations';
let database;

let tableSimulation;

module.exports = {
  start({lowDBFile}) {
    low(new FileAsync(lowDBFile))
      .then((db) => {
        debug('LowDB connected...');
        database = db;
        if (!database.has(TABLE_SIMULATION).value()) {
          database.defaults({ simulations: [] }).write();
        }

        tableSimulation = database.get(TABLE_SIMULATION)
      })
      .catch(err => debug('LowDB connection failed...', err.message));
  },
  getSimulations() {
    return tableSimulation;
  },
};
