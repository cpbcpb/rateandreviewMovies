require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./config/passport');
const MovieDB = require('moviedb')('your api key');
passportSetup(passport);

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/movie-express')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

//passport stuff
app.use(session({
  secret: 'angular auth passport secret shh',
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 }
}));

app.use(passport.initialize());
app.use(passport.session());

//allow cross origin request somethings
app.use(cors({
  credentials: true,
  origin:['http://localhost:4200']
}))

const index = require('./routes/index');
app.use('/', index);

const reviewRoutes=require('./routes/reviewRoutes')
app.use('/review', reviewRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/user', authRoutes);


const commentRoutes=require('./routes/commentRoutes')
app.use('/comment', commentRoutes);

const omdbRoutes=require('./routes/omdbRoutes')
app.use('/omdb', omdbRoutes);

const tmdbRoutes=require('./routes/tmdbRoutes')
app.use('/movies', tmdbRoutes);


module.exports = app;
