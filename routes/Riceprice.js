const express = require('express');
const routers = express.Router();
const contrl = require('../controller');

routers.get('/', contrl.GETricePrcie);

module.exports = routers;