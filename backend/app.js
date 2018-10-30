const bodyParser = require('body-parser');
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
// import favicon from 'serve-favicon';
import path from 'path';
import sassMiddleware from 'node-sass-middleware';
import index from './routes/index';
import passport from 'passport';


import registerRoutes from './custom_modules/accounts/routes/index';
import dashboardRoutes from './custom_modules/dashboard/routes/index';
import userRoutes from './custom_modules/userManagement/routes/index';
import adminRoutes from './custom_modules/adminManagement/routes/index';
import fairytaleRoutes from './custom_modules/fairytales/routes/index';
import shopItemsRoutes from './custom_modules/shopitems/routes/index';
import healthRoutes from './custom_modules/healthrecord/routes/index';





const app = express();
const debug = Debug('reddiapp:app');
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
import './config/database';
// import './config/config';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
require('./config/passport')(passport);
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', registerRoutes);
app.use('/', dashboardRoutes);
app.use('/', userRoutes);
app.use('/', adminRoutes);
app.use('/', fairytaleRoutes);
app.use('/', shopItemsRoutes);
app.use('/', healthRoutes);



// app.get('/auth/google', passport.authenticate('google'));

// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/auth/google' }),
//     (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
    debug('Caught exception: %j', err);
    process.exit(1);
});

export default app;