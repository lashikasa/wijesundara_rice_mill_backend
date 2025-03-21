const express = require('express');
const routers = express.Router();
const contrl = require('../controller');


routers.get('/', contrl.GETorderdet);
routers.post('/', contrl.CreateOrder);
routers.put('/:id', contrl.UpdateOrder);
routers.delete('/:id', contrl.DeleteORder);
routers.post('/:id', contrl.GetbidByIdOrder);


module.exports = routers;