const express = require('express');
const routers = express.Router();
const contrl = require('../controller');


routers.get('/:id', contrl.GetbidByIdSupplier);
routers.post('/', contrl.Createsupplier);
routers.put('/:id', contrl.UpdateSupplier);
routers.delete('/:id', contrl.Createsupplier);
routers.post('/', contrl.LoginSupplier);


module.exports = routers;