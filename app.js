var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoUtil = require('./routes/dbconnection/db') 
var singupController = require('./routes/controllers/signupController')
var loginController = require('./routes/controllers/loginController')
var flatController = require('./routes/controllers/flatController')
var maintenanceController = require('./routes/controllers/maintenanceController')




var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// con.database();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', singupController)
app.use('/login', loginController)
app.use('/flats', flatController)
app.use('/maintenance', maintenanceController)





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  // start the rest of your app here
} );

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

      //   // Initialize the app.
      //   var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
      //     var port = server.address().port;
      //     console.log("App now running on port", port);
      // });

module.exports = app;
