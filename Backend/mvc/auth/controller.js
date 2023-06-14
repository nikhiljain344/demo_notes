const utills = require("../../utills/utills");
const service = require("./service");

module.exports = {
  // Creating a user
  signup: async function (req, res) {
    service.signup(req.body, function (error, data, message, code) {
      return res.status(code).json(utills.createResult(error, data, message, code));
    });
  },
  signin: async function (req, res) {
    service.signin(req.body, function (error, data, message, code) {
      return res.status(code).json(utills.createResult(error, data, message, code));
    });
  },
  update: async function (req, res) {
    req.body.id = req.user.id;
    service.update(req.body, function (error, data, message, code) {
      return res.status(code).json(utills.createResult(error, data, message, code));
    });
  }
}
