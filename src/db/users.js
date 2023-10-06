const Users = require('../models/UserSchema');

const findById = async (id, callback) => {
    const user = await Users.findOne({ id }).select('-__v');
    process.nextTick(function () {
      if (user) {
        callback(null, user);
      } else {
        callback(new Error('User ' + id + ' does not exist'));
      }
    });
};

const findByUserName = async (login, callback) => {
    const user = await Users.findOne({ login }).select('-__v');
    process.nextTick(function () {
      if (user) {
        return callback(null, user);
      }
      return callback(null, null);
    });
};

const verifyPassword = (user, password) => {
    return user.password === password;
};

module.exports = {verifyPassword, findById, findByUserName};

