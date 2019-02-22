const User = require("../models/user");

/**
 * @function addUser
 * @param {Object}
 */
module.exports.addUser = userDetails => {
  return new Promise((resolve, reject) => {
    try {
      // Check if user present
      User.findOne({
        email: userDetails.email
      })
        .exec()
        .then(user => {
          if (user) {
            return reject(new Error("User already registered"));
          }

          let newUser = new User(userDetails);

          console.log("not admin");
          newUser.save().then(savedUser => resolve(savedUser));
        })
        .catch(err => reject(err));
    } catch (error) {
      return reject(error);
    }
  });
};
