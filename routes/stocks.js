const express = require('express');
const routers = express.Router();
const contrl = require('../controller');

routers.get('/:supplierId', contrl.GetstockbyID);
routers.get('/', contrl.GETstock);


module.exports = routers;