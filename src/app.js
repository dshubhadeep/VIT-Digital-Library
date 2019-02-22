const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("cookie-session");
const compresion = require("compression");
require("dotenv").config();

// Routers
const indexRouter = require("./routes");

const app = express();

// Auth
const auth = require("./middleware/auth");

// DB connection

mongoose.Promise = global.Promise;

const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

mongoose.connect(
  MONGO_URI,
  { useCreateIndex: true, useNewUrlParser: true },
  () => {
    console.log("Connected to " + MONGO_URI);
  }
);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compresion());

// Session
const keys = ["Michael", "Scarn"];
const expiryDate = new Date(5 * Date.now() + 60 * 60 * 1000); // 5 hours

app.use(
  session({
    secret: process.env.SESSION_SECRET || "riviera",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true,
      expires: expiryDate
    },
    keys: keys
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
app.use(flash());

// Router setup
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
