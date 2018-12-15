const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes/routes');
const corsMiddleware = require('./middlewares/cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(corsMiddleware);
app.use('/', routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
