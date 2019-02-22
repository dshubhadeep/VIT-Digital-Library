const express = require("express");
const router = express.Router();
const passport = require("passport");

const auth = require("../middleware/auth");
const userDb = require("../services/user");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

/**
 *  REGISTER ROUTES
 */
router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/register", function(req, res, next) {
  userDb
    .addUser(req.body)
    .then(user => {
      passport.authenticate("login", {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true
      })(req, res, function() {
        res.redirect("/home");
      });
    })
    .catch(next);
});

/**
 *  LOGIN ROUTES
 */
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/home", auth.isLoggedIn, (req, res) => {
  //   if (req.user.role === "admin") res.redirect("/admin");
  res.render("home", { user: req.user });
});

router.get("/admin", auth.isAdmin, (req, res) => {
  res.render("admin", { user: req.user });
});

module.exports = router;
