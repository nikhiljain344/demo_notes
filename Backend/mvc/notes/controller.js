const utills = require("../../utills/utills");
const service = require("./service");

module.exports = {
  // Creating a user
  create: async function (req, res) {
    req.body.user_id = req.user.id;
    service.create(req.body, function (error, data, message, code) {
      return res.status(code).json(utills.createResult(error, data, message, code));
    });
  },
  getAll: async function (req, res) {
    req.body.page = parseInt(req?.query?.page) || 0
    service.getAll(req.body, function (error, data, message, code) {
      return res.status(code).json(utills.createResult(error, data, message, code));
    });
  },
  update: async function (req, res) {
    service.update(req.body, function (error, data, message, code) {
      return res.status(code).json(utills.createResult(error, data, message, code));
    });
  },
  delete: async function (req, res) {
    req.body.id = req.params.id;
    service.delete(req.body, function (error, data, message, code) {
      return res.status(code).json(utills.createResult(error, data, message, code));
    });
  }
}
