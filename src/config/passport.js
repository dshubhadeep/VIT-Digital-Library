const passportStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

/**
 * @function passport
 * returns promisified done status for login/register
 */
module.exports = passport => {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .exec()
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  passport.use(
    "login",
    new passportStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      (req, email, password, done) => {
        process.nextTick(() => {
          User.findOne({ email })
            .exec()
            .then(user => {
              if (!user) {
                return done(null, false, {
                  message: "User not found."
                });
              }
              if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {
                  message: "Wrong password."
                });
              }
              return done(null, user);
            })
            .catch(err => done(err));
        });
      }
    )
  );
};
