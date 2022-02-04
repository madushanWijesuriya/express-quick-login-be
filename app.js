var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var helmet = require("helmet");
var logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var colorRouter = require("./routes/colors");
require("./config/database");
require("./models/Users");
require("./config/passport");

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";
//Initiate our app
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/colors", colorRouter);
app.use(require("./routes"));
app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}
app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

module.exports = app;
