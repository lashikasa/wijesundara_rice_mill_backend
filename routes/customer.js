const express = require('express');
const routers = express.Router();
const contrl = require('../controller');

routers.post('/', contrl.Logincustomer);
routers.get('/:id', contrl.GetbidByIdCustomer);
routers.post('/', contrl.Createcustomer);
routers.put('/:id', contrl.UpdateCus);
routers.delete('/:id', contrl.Deletecus);


module.exports = routers;