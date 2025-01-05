import createError from 'http-errors';
import cors from 'cors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './src/routes/index.js';
import mealRouter from './src/routes/MealsRoute.js';
import usersRouter from './src/routes/UsersRoute.js';
import { ConnectToMongoose } from './src/schema/mongoDb_conn.js';

ConnectToMongoose();

const app = express();
app.set('port', process.env.PORT || 5000);
app.use(cors());

// view engine setup
app.set('views', path.join(path.resolve(), 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Meals', mealRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Log the port that is being listened on
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

export default app;
