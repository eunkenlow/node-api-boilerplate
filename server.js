require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Knex = require('knex');
const { Model } = require('objection');

const knexConfig = require('./knexfile');
const utils = require('./services/utils');
const Authorization = require('./middlewares/authorization');

const baseRouter = require('./routes/baseRouter');
const v1Router = require('./routes/v1');

const knexConnection = Knex(knexConfig);
Model.knex(knexConnection);

const server = express();

// External Middlewares
server.use(morgan('combined'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors());

// Authorization Middleware
server.use(Authorization.validate);

// Routes
const router = express.Router();
baseRouter.add(router, v1Router);
server.use('/', router);

// Server
server.use('/', (req, res) => {
  res.send('Node Api Boilerplate Service');
});

const port = parseInt(process.env.PORT, 10) || 3000;
server.listen(port, () => utils.log(`Server running on port ${port}`));

module.exports = server;
