// Import required modules
const path = require('path');
require('dotenv').config();
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');

// Set up handlebars engine with custom helpers
const hbs = exphbs.create({ helpers });

// Configure session options
const sess = {
  secret: 'Super secret secret',
  cookie: { maxAge: 7200000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
const app = express();
const PORT = process.env.PORT || 3001;

// Set up express static middleware to serve files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Configure handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configure express to parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure express to use session middleware
app.use(session(sess));

// Set up routes
app.use(routes);

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3001, () => console.log('Now listening'));
});
