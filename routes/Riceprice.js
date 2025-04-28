const express = require('express');
const routers = express.Router();
const contrl = require('../controller');

routers.get('/', contrl.GETricePrcie);
routers.get('/:type',contrl.Getprice);

module.exports = routers;