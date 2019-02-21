const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  User = require("./models/user"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  BookDetail = require("./models/bookdetail"),
  cookieParser = require("cookie-parser");

require("dotenv").config();

app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
mongoose.Promise = global.Promise;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/secret", isLoggedIn, function(req, res) {
  res.render("secret");
});

// AUTH Routes

//sign up page
app.get("/register", function(req, res) {
  res.render("register");
});

// register post
app.post("/register", function(req, res) {
  User.register(
    new User({
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secret");
      });
    }
  );
});
// LOGIN
// render login form
app.get("/login", function(req, res) {
  res.render("login");
});
//login logic
//middleware
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.get("/pay", function(req, res) {
  var book = req.cookies.bookName;
  BookDetail.find({ title: book }).then(function(result) {
    res.render("pay", {
      title: result[0].title,
      author: result[0].author,
      price: result[0].price
    });
    console.log(result);
  });
});

app.get("/it", function(req, res) {
  BookDetail.find({ category: "it" }).then(function(result) {
    res.render("it", {
      books: result
    });
    console.log(result);
  });
});

app.get("/civil", function(req, res) {
  BookDetail.find({ category: "civil" }).then(function(result) {
    res.render("civil", {
      books: result
    });
    console.log(result);
  });
});

app.get("/mech", function(req, res) {
  BookDetail.find({ category: "mech" }).then(function(result) {
    res.render("mech", {
      books: result
    });
    console.log(result);
  });
});

app.get("/eee", function(req, res) {
  BookDetail.find({ category: "eee" }).then(function(result) {
    res.render("eee", {
      books: result
    });
    console.log(result);
  });
});

app.get("/bio", function(req, res) {
  BookDetail.find({ category: "bio" }).then(function(result) {
    res.render("bio", {
      books: result
    });
    console.log(result);
  });
});

app.get("/chem", function(req, res) {
  BookDetail.find({ category: "chem" }).then(function(result) {
    res.render("chem", {
      books: result
    });
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", (req, res) => {
  var book = new BookDetail({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    publisher: req.body.publisher,
    edition: req.body.edition,
    year: req.body.year,
    pages: req.body.pages,
    size: req.body.pages,
    price: req.body.price,
    dlink: req.body.dlink
  });
  book.save().then(() => {
    console.log("Saved..");
    res.redirect("/secret");
  });
});

app.get("dwnld", (req, res) => {
  res.render("dwnld");
});

app.listen(3300, function() {
  console.log("Example app listening on port 3300!");
});
