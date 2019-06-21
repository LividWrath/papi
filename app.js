require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const routes = require('./routes');
const initDB = require('./initDB');

const apiServerConfigs = config.get('apiServer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'puppies', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api', routes);
const port = process.env.PORT || apiServerConfigs.port;
initDB(() => {
  app.listen(port, function() {
    console.log(`Running Papi on port ${port}`);
  });
});
