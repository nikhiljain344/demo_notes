const db = require("../../database/db");
const bcrypt = require('bcrypt');
const Users = db.models.users;
const jwt = require('jsonwebtoken');

module.exports = {
  signup: async function (data, cb) {
    try {
      const user = await Users.findOne({ where: { email: data?.email } })
      if (user) return cb("The user already exists.", null, "The user already exists.", 400);
      else {
        data.password = await bcrypt.hash(data.password, 12);
        const newUser = await Users.create(data);
        return cb(null, newUser, "Create Account Successfully.", 201);
      }
    } catch (error) {
      return cb(error, null, "Something went worng.", 500);
    }
  },
  signin: async function (data, cb) {
    try {
      const user = await Users.findOne({ where: { email: data?.email } })
      if (!user) return cb("User not found.", null, "User not found.", 400);
      else {
        bcrypt.compare(data?.password, user?.password, (error, result) => {
          if (error) return cb(error, null, "Somthing went worng", 500);
          if (result) {
            const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_KEY);
            return cb(null, { token, user }, "User login successfuly", 200);
          } else return cb("Incorrect Password", null, "Please enter correct password.", 400);
        })
      }
    } catch (error) {
      return cb(error, null, "Something went worng.", 500);
    }
  },
  update: async function (data, cb) {
    try {
      if (data.password) delete data.password;
      await Users.update(data, { where: { id: data.id } });
      const user = await Users.findOne({ where: { id: data.id } })
      return cb(null, user, "User updated successfully.", 200);
    } catch (error) {
      return cb(error, null, "Something went worng.", 500);
    }
  },
}
