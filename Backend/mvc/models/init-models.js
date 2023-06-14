var DataTypes = require("sequelize").DataTypes;
var _users = require("./users");
var _notes = require("./notes");

function initModels(sequelize) {

  var users = _users(sequelize, DataTypes);
  var notes = _notes(sequelize, DataTypes);

  return {
    users,
    notes
  };
}

module.exports = initModels;